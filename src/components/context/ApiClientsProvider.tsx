'use client';

import { createCatalogClient } from '@/api/catalog';
import { createOrdersClient } from '@/api/orders';
import { createUsersClient } from '@/api/users';
import { ReactNode, useMemo } from 'react';
import { ApiClients, ApiClientsContext } from './ApiClientsContext';

export interface Props {
  children: ReactNode | ReactNode[];
}

let sessionToken: string | null = null;

if (typeof window !== 'undefined') {
  sessionToken = localStorage.getItem('sessionToken');
}

const ApiClientsProvider = ({ children }: Props) => {
  const clients = useMemo<ApiClients>(
    () => ({
      users: createUsersClient(sessionToken),
      orders: createOrdersClient(sessionToken),
      catalog: createCatalogClient(sessionToken),
    }),
    [],
  );

  return <ApiClientsContext value={clients}>{children}</ApiClientsContext>;
};

export default ApiClientsProvider;
