'use client';

import LoadingScreen from '@/components/LoadingScreen';
import ProtectedPage from '@/components/ProtectedPage';
import { useApiClients } from '@/hooks/use-api-clients';
import { useOrderSubscription } from '@/hooks/use-order-subscription';
import { OrderStatus } from '@/schemas/order';
import { dayjs } from '@/util';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  LuBox,
  LuCarFront,
  LuChefHat,
  LuClock,
  LuInfo,
  LuUser,
} from 'react-icons/lu';

const statusLabels: Record<OrderStatus, string> = {
  wait_for_cook: 'Esperando cocinero',
  cooking: 'Cocinando',
  wait_for_dispatcher: 'Esperando despachador',
  dispatching: 'Despachando',
  wait_for_deliverer: 'Esperando conductor',
  delivering: 'En camino',
  complete: 'Entregado',
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

  return (
    <ProtectedPage>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-6 text-2xl font-semibold">
          Pedido <span className="font-mono">{order.order_id}</span>
        </h1>

        <div className="text-muted mb-10 space-y-2">
          <div>
            <LuUser className="mr-2 inline" />
            Realizado por{' '}
            <span className="font-semibold">
              {order.client.username}
            </span> el{' '}
            {dayjs(order.created_at)
              .locale('es')
              .format('D [de] MMMM [a las] hh:mm A')}
          </div>
          <div>
            <LuInfo className="mr-2 inline" />
            {statusLabels[order.status]}
          </div>
          <div>
            <LuChefHat className="mr-2 inline" />
            {order.cook?.username ?? '(Sin asignar)'}
          </div>
          <div>
            <LuBox className="mr-2 inline" />
            {order.dispatcher?.username ?? '(Sin asignar)'}
          </div>
          <div>
            <LuCarFront className="mr-2 inline" />
            {order.driver?.username ?? '(Sin asignar)'}
          </div>
        </div>

        <h2 className="text-2xl font-semibold">Productos</h2>
        <ul className="mt-3 mb-8 list-disc text-lg">
          {order.items.map((item, idx) => (
            <li key={idx}>
              <p>
                {item.product.name} x{item.quantity}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold">Historial</h2>
        <ul className="my-4 space-y-3">
          {order.history.map((entry, idx) => {
            const prevDate =
              idx === order.history.length - 1
                ? order.created_at
                : order.history[idx + 1].date;

            return (
              <li key={idx} className="bg-accent/10 rounded px-4 py-2">
                <div>
                  Estado cambiado a{' '}
                  <span className="font-semibold text-red-900">
                    &quot;{statusLabels[entry.status]}&quot;
                  </span>{' '}
                  por{' '}
                  <span className="font-semibold text-red-900">
                    {entry.user.username}
                  </span>
                  .
                </div>

                <div className="text-muted mb-1 text-xs">
                  {dayjs(entry.date)
                    .locale('es')
                    .format('D [de] MMMM [a las] hh:mm A')}{' '}
                </div>
                <div className="text-muted">
                  <LuClock className="mr-1 inline" />
                  {dayjs
                    .duration(dayjs(entry.date).diff(prevDate))
                    .locale('es')
                    .format('H [horas,] m [minutos,] s [segundos]')}
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </ProtectedPage>
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
