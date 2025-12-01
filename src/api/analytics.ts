import { OrderStatus } from '@/schemas/order';
import {
  initClient,
  initContract,
  type InitClientArgs,
  type InitClientReturn,
} from '@ts-rest/core';
import { z } from 'zod';
import { env } from '../env';

const c = initContract();

export const contract = c.router(
  {
    getStatusCounts: {
      method: 'GET',
      path: '/status-counts',
      responses: {
        200: z.record(OrderStatus, z.number()),
      },
    },
    getPopularProducts: {
      method: 'GET',
      path: '/popular-products',
      responses: {
        200: z.array(
          z.object({
            product_id: z.string(),
            product_name: z.string(),
            total_quantity: z.coerce.number(),
          }),
        ),
      },
    },
  },
  { strictStatusCodes: true },
);

const clientArgs = {
  baseUrl: env.NEXT_PUBLIC_ANALYTICS_URL,
  throwOnUnknownStatus: true,
  validateResponse: true,
} as const satisfies InitClientArgs;

export type AnalyticsApiClient = InitClientReturn<
  typeof contract,
  typeof clientArgs
>;

export const createAnalyticsClient = (
  token: string | null,
): AnalyticsApiClient => {
  return initClient(contract, {
    ...clientArgs,
    baseHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
