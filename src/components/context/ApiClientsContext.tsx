'use client';

import { CatalogApiClient } from '@/api/catalog';
import { OrdersApiClient } from '@/api/orders';
import { UsersApiClient } from '@/api/users';
import { createContext } from 'react';

export interface ApiClients {
  users: UsersApiClient;
  orders: OrdersApiClient;
  catalog: CatalogApiClient;
}

export const ApiClientsContext = createContext<ApiClients | null>(null);
