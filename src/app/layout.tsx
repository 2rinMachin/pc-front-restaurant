import Providers from '@/components/context/Providers';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { sharpSans } from '@/fonts';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pizza Hut',
};

export interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => (
  <html lang="es" className="flex min-h-full flex-col">
    <body
      className={twJoin(sharpSans.className, 'flex grow flex-col antialiased')}
    >
      <Providers>
        <Header />
        <div className="grow">{children}</div>
        <Footer />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
