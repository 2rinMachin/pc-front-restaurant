import NavPanel from '@/components/NavPanel';
import { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => (
  <div className="mx-55 my-5 flex">
    <NavPanel />
    <div className="grow">{children}</div>
  </div>
);

export default RootLayout;
