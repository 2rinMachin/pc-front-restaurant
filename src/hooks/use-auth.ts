import {
  AuthContext,
  AuthContextValue,
} from '@/components/context/AuthContext';
import { useContext } from 'react';

export const useAuth = (): AuthContextValue => {
  const auth = useContext(AuthContext);

  if (auth === null) throw new Error('AuthContext not initialized');

  return auth;
};
