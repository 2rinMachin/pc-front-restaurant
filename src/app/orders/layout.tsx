import ProtectedPage from '@/components/ProtectedPage';
import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

const OrdersLayout = ({ children }: Props) => (
  <ProtectedPage allowedRoles={['admin']}>{children}</ProtectedPage>
);

export default OrdersLayout;
