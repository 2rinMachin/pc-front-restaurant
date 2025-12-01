import { z } from 'zod';
import { Order } from './order';

export const WebSocketMessage = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('order_created'), data: Order }),
  z.object({ kind: z.literal('order_status_updated'), data: Order }),
  z.object({ kind: z.literal('subscription_failed') }),
  z.object({ kind: z.literal('subscription_success') }),
]);

export type WebSocketMessage = z.infer<typeof WebSocketMessage>;
