import { Order, OrderStatus } from '@/schemas/order';
import { dayjs } from '@/util';
import { useState } from 'react';
import { LuClock, LuUser } from 'react-icons/lu';
import { useInterval } from 'usehooks-ts';

export interface Props {
  order: Order;
  actionEnabled: boolean;
  showAction?: boolean;
  showTimer?: boolean;
  showStatus?: boolean;
  handleAction?: () => void;
}

const actionLabels: Partial<Record<OrderStatus, string>> = {
  wait_for_cook: 'Empezar a cocinar',
  cooking: 'Terminar de cocinar',
  wait_for_dispatcher: 'Empezar despacho',
  dispatching: 'Terminar despacho',
  wait_for_deliverer: 'Iniciar delivery',
  delivering: 'Comenzar delivery',
};

const statusLabels: Record<OrderStatus, string> = {
  wait_for_cook: 'Esperando cocinero',
  cooking: 'Cocinando',
  wait_for_dispatcher: 'Esperando despachador',
  dispatching: 'Despachando',
  wait_for_deliverer: 'Esperando conductor',
  delivering: 'En camino',
  complete: 'Entregado',
};

const OrderCard = ({
  order,
  actionEnabled,
  showAction = true,
  showTimer = false,
  showStatus = false,
  handleAction,
}: Props) => {
  const lastEntry = order.history[0];

  const [now, setNow] = useState(dayjs());

  useInterval(() => {
    setNow(dayjs());
  }, 1000);

  return (
    <li
      key={order.order_id}
      className="relative space-y-3 overflow-hidden rounded-md px-4 py-3 shadow-lg"
    >
      {showAction && !actionEnabled && (
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/25"></div>
      )}
      <div className="flex items-center justify-between gap-x-6">
        <div className="flex items-center gap-x-2">
          <LuUser className="size-6" />
          <span>{order.client.username}</span>
        </div>
        {showAction && actionLabels[order.status] && (
          <div className="flex items-center gap-x-3">
            <button
              onClick={() => handleAction?.()}
              className="text-background bg-accent rounded px-4 py-2 enabled:cursor-pointer disabled:brightness-75"
              disabled={!actionEnabled}
            >
              {actionLabels[order.status]}
            </button>
          </div>
        )}
        {showStatus && <div>{statusLabels[order.status]}</div>}
      </div>
      <ul>
        {order.items.map((item, i) => (
          <li key={i}>
            {item.product.name} x{item.quantity}
          </li>
        ))}
      </ul>
      <div className="text-muted flex justify-between">
        <span>
          {dayjs(order.created_at)
            .locale('es')
            .format('D [de] MMMM [a las] hh:mm A')}
        </span>
        {showTimer && lastEntry && (
          <span>
            <LuClock className="mr-2 inline" />
            {dayjs
              .duration(now.diff(lastEntry.date))
              .locale('es')
              .format('HH:mm:ss')}
          </span>
        )}
      </div>
    </li>
  );
};

export default OrderCard;
