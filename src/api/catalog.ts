import { CreateProductRequest } from '@/schemas/create-product-requests';
import { Product } from '@/schemas/product';
import { UpdateProductRequest } from '@/schemas/update-product-requests';
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
    getAllProducts: {
      method: 'GET',
      path: '/products',
      responses: {
        200: z.array(Product),
      },
    },
    getProductById: {
      method: 'GET',
      path: '/products/:id',
      responses: {
        200: Product,
        404: z.unknown(),
      },
    },
    createProduct: {
      method: 'POST',
      path: '/products',
      body: CreateProductRequest,
      responses: {
        201: Product,
      },
    },
    updateProduct: {
      method: 'PUT',
      path: '/products/:id',
      body: UpdateProductRequest,
      responses: {
        200: Product,
      },
    },
    deleteProduct: {
      method: 'DELETE',
      path: '/products/:id',
      responses: {
        204: z.unknown(),
      },
    },
  },
  { strictStatusCodes: true },
);

const clientArgs = {
  baseUrl: env.NEXT_PUBLIC_CATALOG_URL,
  throwOnUnknownStatus: true,
  validateResponse: true,
} as const satisfies InitClientArgs;

export type CatalogApiClient = InitClientReturn<
  typeof contract,
  typeof clientArgs
>;

export const createCatalogClient = (token: string | null): CatalogApiClient => {
  return initClient(contract, {
    ...clientArgs,
    baseHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
