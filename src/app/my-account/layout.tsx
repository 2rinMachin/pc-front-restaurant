import NavPanel from '@/components/NavPanel';
import ProtectedPage from '@/components/ProtectedPage';
import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => (
  <ProtectedPage>
    <div className="mx-55 my-5 flex">
      <NavPanel />
      <div className="grow">{children}</div>
    </div>
  </ProtectedPage>
);

export default RootLayout;
