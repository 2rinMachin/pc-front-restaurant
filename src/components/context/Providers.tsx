'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import ApiClientsProvider from './ApiClientsProvider';
import AuthProvider from './AuthProvider';
import CartProvider from './CartProvider';

export interface Props {
  children: ReactNode | ReactNode[];
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const Providers = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <ApiClientsProvider>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </ApiClientsProvider>
  </QueryClientProvider>
);

export default Providers;
