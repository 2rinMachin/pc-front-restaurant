import ProtectedPage from '@/components/ProtectedPage';
import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

const CatalogLayout = ({ children }: Props) => (
  <ProtectedPage allowedRoles={['admin']}>{children}</ProtectedPage>
);

export default CatalogLayout;
