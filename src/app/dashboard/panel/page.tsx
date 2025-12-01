'use client';

import LoadingScreen from '@/components/LoadingScreen';
import OrderCard from '@/components/OrderCard';
import ProtectedPage from '@/components/ProtectedPage';
import { env } from '@/env';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import { useAuth } from '@/hooks/use-auth';
import { roleLabels } from '@/lang';
import { Order, OrderStatus } from '@/schemas/order';
import { WebSocketMessage } from '@/schemas/websocket-message';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { twJoin } from 'tailwind-merge';

const nextStatus = {
  wait_for_cook: 'cooking',
  cooking: 'wait_for_dispatcher',
  wait_for_dispatcher: 'dispatching',
  dispatching: 'wait_for_deliverer',
  wait_for_deliverer: 'delivering',
  delivering: 'complete',
} as const satisfies Partial<Record<OrderStatus, OrderStatus>>;

const roleInfo = {
  cook: {
    inProgress: 'Cocinando',
    startStatus: 'wait_for_cook',
  },
  dispatcher: {
    inProgress: 'Despachando',
    startStatus: 'wait_for_dispatcher',
  },
  driver: {
    inProgress: 'Entregando',
    startStatus: 'wait_for_deliverer',
  },
  client: {
    inProgress: '',
    startStatus: 'wait_for_cook',
  },
  admin: {
    inProgress: '',
    startStatus: 'wait_for_cook',
  },
} as const;

const PanelPage = () => {
  const apiClients = useApiClients();
  const auth = useAuth();

  const startStatus = auth.user
    ? roleInfo[auth.user.role].startStatus
    : 'wait_for_cook';
  const doingStatus = nextStatus[startStatus];

  const {
    data: activeOrders,
    error: error1,
    refetch: refetchActiveOrders,
  } = useQuery({
    queryKey: ['orders', startStatus, auth.user?.user_id],
    queryFn: () =>
      apiClients.orders.getAllOrders({
        query: { cook_id: auth.user?.user_id, status: doingStatus },
      }),
  });

  const {
    data: orders,
    error: error2,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ['orders', startStatus],
    queryFn: () =>
      apiClients.orders.getAllOrders({ query: { status: startStatus } }),
  });

  const { readyState, lastJsonMessage, sendMessage } = useWebSocket(
    env.NEXT_PUBLIC_WEBSOCKET_URL,
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('ready');

      sendMessage(
        JSON.stringify({
          action: 'subscribe',
          tenant_id: env.NEXT_PUBLIC_TENANT_ID,
          order_id: null,
        }),
      );
    }
  }, [sendMessage, readyState]);

  useEffect(() => {
    if (!lastJsonMessage) return;

    const message = WebSocketMessage.parse(lastJsonMessage);

    if (message.kind === 'subscription_success') {
      console.log('subscribed');
      return;
    }

    if (
      message.kind === 'order_created' ||
      message.kind === 'order_status_updated'
    ) {
      refetchOrders();
      refetchActiveOrders();
      return;
    }
  }, [lastJsonMessage, refetchOrders, refetchActiveOrders]);

  const handleAction = async (order: Order) => {
    if (order.status != 'complete') {
      await apiClients.orders.updateOrderStatus({
        params: { id: order.order_id },
        body: {
          status: nextStatus[order.status],
        },
      });

      await refetchOrders();
    }
  };

  if (error1 || error2) {
    console.error(error1);
    console.error(error2);
    return <main>Algo salió mal :(</main>;
  }

  if (!auth.user || !orders || !activeOrders) return <LoadingScreen />;

  return (
    <ProtectedPage>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8">
          <h1
            className={twJoin(brixtonWood.className, 'mb-3 text-6xl uppercase')}
          >
            Panel de pedidos
          </h1>
          <p className="text-lg">
            Tu rol:{' '}
            <span className="font-semibold uppercase">
              {roleLabels[auth.user.role]}
            </span>
          </p>
        </div>

        <div className="grid grid-rows-2 divide-solid divide-neutral-300 not-md:divide-y md:grid-cols-2 md:divide-x">
          <div className="px-8 not-md:py-6">
            <h2 className="mb-6 text-center text-4xl">Pedidos en cola</h2>
            {orders.body.items.length === 0 ? (
              <p className="text-muted mb-12 text-center text-xl">
                No hay pedidos en espera.
              </p>
            ) : (
              <ul className="space-y-3">
                {orders.body.items.map((order, idx) => (
                  <OrderCard
                    key={order.order_id}
                    order={order}
                    actionEnabled={idx === 0}
                    handleAction={() => handleAction(order)}
                  />
                ))}
              </ul>
            )}
          </div>
          <div className="px-8 not-md:py-6">
            <h2 className="mb-6 text-center text-4xl">
              {roleInfo[auth.user.role].inProgress}
            </h2>
            {activeOrders.body.items.length === 0 ? (
              <p className="text-muted mb-12 text-center text-xl">
                No tienes pedidos en curso.
              </p>
            ) : (
              <ul className="mb-12 space-y-3">
                {activeOrders.body.items.map((order) => (
                  <OrderCard
                    key={order.order_id}
                    order={order}
                    actionEnabled
                    handleAction={() => handleAction(order)}
                    showTimer
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </ProtectedPage>
  );
};

export default PanelPage;
