import dayjs from 'dayjs';
import 'dayjs/locale/es';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { OrderStatus } from './schemas/order';

export const formatPrice = (price: number) => `S/.${price.toFixed(2)}`;

export const STATUS_LABELS: Record<OrderStatus, string> = {
  wait_for_cook: 'Esperando cocinero',
  cooking: 'Cocinando',
  wait_for_dispatcher: 'Esperando despachador',
  dispatching: 'Despachando',
  wait_for_deliverer: 'Esperando repartidor',
  delivering: 'Entregando',
  complete: 'Completada',
} as const;

dayjs.extend(duration);
dayjs.extend(relativeTime);

export { dayjs };
