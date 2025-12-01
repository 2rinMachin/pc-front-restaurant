import { z } from 'zod';

export const CreateOrderItem = z.object({
  product_id: z.string(),
  quantity: z.int().positive(),
});

export type CreateOrderItem = z.infer<typeof CreateOrderItem>;

export const CreateOrderRequest = z.object({
  items: z.array(CreateOrderItem),
});

export type CreateOrderRequest = z.infer<typeof CreateOrderRequest>;
