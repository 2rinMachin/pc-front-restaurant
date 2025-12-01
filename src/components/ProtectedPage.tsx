import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/schemas/user';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import LoadingScreen from './LoadingScreen';

interface Props {
  allowedRoles?: UserRole[];
  children: ReactNode | ReactNode[] | null;
}

const ProtectedPage = ({ allowedRoles, children }: Props) => {
  const auth = useAuth();

  if (auth.loading) return <LoadingScreen />;

  if (
    !auth.user ||
    auth.user.role === 'client' ||
    (allowedRoles && !allowedRoles.includes(auth.user.role))
  )
    return redirect('/login');

  return children;
};

export default ProtectedPage;
