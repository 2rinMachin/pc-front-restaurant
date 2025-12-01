import { CreateOrderRequest } from '@/schemas/create-order-requests';
import { Order, OrderStatus } from '@/schemas/order';
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
    getAllOrders: {
      method: 'GET',
      path: '/orders',
      query: z.object({
        last_key: z.string().optional(),
        limit: z.number().optional(),
        status: OrderStatus.optional(),
        client_id: z.string().optional(),
        cook_id: z.string().optional(),
        dispatcher_id: z.string().optional(),
        driver_id: z.string().optional(),
      }),
      responses: {
        200: z.object({
          items: z.array(Order),
          next_key: z.string().nullable(),
        }),
      },
    },
    getOrderById: {
      method: 'GET',
      path: '/orders/:id',
      responses: {
        200: Order,
        404: z.unknown(),
      },
    },
    createOrder: {
      method: 'POST',
      path: '/orders',
      body: CreateOrderRequest,
      responses: {
        201: Order,
      },
    },
    updateOrderStatus: {
      method: 'PATCH',
      path: '/orders/:id/status',
      body: z.object({ status: OrderStatus }),
      responses: {
        200: Order,
        404: z.unknown(),
      },
    },
  },
  { strictStatusCodes: true },
);

const clientArgs = {
  baseUrl: env.NEXT_PUBLIC_ORDERS_URL,
  throwOnUnknownStatus: true,
  validateResponse: true,
} as const satisfies InitClientArgs;

export type OrdersApiClient = InitClientReturn<
  typeof contract,
  typeof clientArgs
>;

export const createOrdersClient = (token: string | null): OrdersApiClient => {
  return initClient(contract, {
    ...clientArgs,
    baseHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
