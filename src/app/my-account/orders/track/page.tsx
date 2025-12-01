'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { useApiClients } from '@/hooks/use-api-clients';
import { useOrderSubscription } from '@/hooks/use-order-subscription';
import { ORDER_STATUSES, OrderStatus } from '@/schemas/order';
import { dayjs } from '@/util';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { LuCalendar } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';

const statusMessages: Record<OrderStatus, string> = {
  wait_for_cook: 'está siendo procesado.',
  cooking: 'está en la cocina.',
  wait_for_dispatcher: 'está por ser despachado.',
  dispatching: 'está siendo despachado.',
  wait_for_deliverer: 'está esperando un conductor.',
  delivering: 'está en camino!',
  complete: 'ha sido entregado!',
};

const StatusBar = ({ current }: { current: OrderStatus }) => {
  const currentIndex = ORDER_STATUSES.indexOf(current);

  return (
    <div className="mx-auto mt-12 flex w-full max-w-3xl items-center justify-between">
      {ORDER_STATUSES.map((step, idx) => {
        const isActive = idx <= currentIndex;

        return (
          <div key={step} className="relative flex-1">
            {idx > 0 && (
              <div
                className={`absolute top-1/2 right-0 -left-1/2 h-3 w-full -translate-y-1/2 ${
                  isActive ? 'bg-accent' : 'bg-neutral-300'
                }`}
              />
            )}

            <div className="relative z-10 flex justify-center">
              <div
                className={twJoin(
                  'size-8 rounded-full border-2',
                  isActive
                    ? 'bg-accent border-red-900'
                    : 'border-neutral-500 bg-neutral-300',
                )}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OrderPage = () => {
  const params = useSearchParams();

  const orderId = params.get('id');
  const apiClients = useApiClients();

  const {
    data: orderData,
    isLoading,
    error,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () =>
      orderId
        ? apiClients.orders.getOrderById({ params: { id: orderId } })
        : null,
  });

  useOrderSubscription({ orderId, onUpdate: () => refetchOrder() });

  if (isLoading || !orderData) return <LoadingScreen />;

  if (error) {
    console.error(error);
    return <main>Algo salió mal :(</main>;
  }

  if (orderData.status === 404) return <main>Orden no encontrada.</main>;

  const order = orderData.body;
  const lastEntry = order.history[0];
  const lastDate = lastEntry?.date ?? order.created_at;

  return (
    <main className="px-6 py-4">
      <h1 className="mb-12 text-lg">
        Pedido <span className="font-mono">{order.order_id}</span>
      </h1>

      <div className="my-24 text-center">
        <p className="mb-4 text-4xl">
          Tu pedido{' '}
          <span className="font-semibold">{statusMessages[order.status]}</span>
        </p>
        <div className="text-xl">
          <span className="text-muted">Última actualización:</span>{' '}
          {dayjs().locale('es').to(lastDate)}
        </div>
        <StatusBar current={order.status} />
      </div>

      <hr className="border-muted my-12" />
      <div className="text-muted">
        <LuCalendar className="mr-2 inline" />
        Realizado el{' '}
        {dayjs(order.created_at)
          .locale('es')
          .format('D [de] MMMM [a las] hh:mm A')}
      </div>
      <ul className="my-5 list-disc text-lg">
        {order.items.map((item, idx) => (
          <li key={idx}>
            <p>
              {item.product.name} x{item.quantity}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

const OrderPageStatic = () => {
  return (
    <Suspense fallback={<>Cargando...</>}>
      <OrderPage />
    </Suspense>
  );
};

export default OrderPageStatic;
