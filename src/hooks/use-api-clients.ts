'use client';

import {
  ApiClients,
  ApiClientsContext,
} from '@/components/context/ApiClientsContext';
import { useContext } from 'react';

export const useApiClients = (): ApiClients => {
  const apiClients = useContext(ApiClientsContext);

  if (apiClients === null)
    throw new Error('ApiClientsContext is not initialized');

  return apiClients;
};
