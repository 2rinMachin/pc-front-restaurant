'use client';

import { useApiClients } from '@/hooks/use-api-clients';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { AuthContext, AuthContextValue } from './AuthContext';

export interface Props {
  children: ReactNode | ReactNode[];
}

const AuthProvider = ({ children }: Props) => {
  const apiClients = useApiClients();

  const { data, isLoading } = useQuery({
    queryKey: ['users', 'self'],
    queryFn: () => apiClients.users.getSelf(),
    retry: false,
  });

  const auth: AuthContextValue = {
    user: data?.status === 200 ? data.body : null,
    loading: isLoading,
  };

  return <AuthContext value={auth}>{children}</AuthContext>;
};

export default AuthProvider;
