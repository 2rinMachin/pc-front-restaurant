import { z } from 'zod';
import { Product } from './product';
import { User } from './user';

export const ORDER_STATUSES = [
  'wait_for_cook',
  'cooking',
  'wait_for_dispatcher',
  'dispatching',
  'wait_for_deliverer',
  'delivering',
  'complete',
] as const;

export const OrderStatus = z.literal(ORDER_STATUSES);
export type OrderStatus = z.infer<typeof OrderStatus>;

export const OrderItem = z.object({
  product: Product,
  quantity: z.int(),
});

export type OrderItem = z.infer<typeof OrderItem>;

export const OrderHistoryEntry = z.object({
  status: OrderStatus,
  date: z.coerce.date(),
  user: User,
});

export type OrderHistoryEntry = z.infer<typeof OrderHistoryEntry>;

export const Order = z.object({
  tenant_id: z.string(),
  order_id: z.string(),
  client: User,
  items: z.array(OrderItem),
  status: OrderStatus,
  created_at: z.coerce.date(),

  cook: User.nullable().optional(),
  dispatcher: User.nullable().optional(),
  driver: User.nullable().optional(),
  history: z.array(OrderHistoryEntry),
});

export type Order = z.infer<typeof Order>;
