'use client';

import ProtectedPage from '@/components/ProtectedPage';
import { brixtonWood } from '@/fonts';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { LuCar, LuNewspaper } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';
import { PopularProducts } from '../components/PopularProducts';
import { StatsPieChart } from '../components/StatsPieChart';

const DashboardPage = () => {
  const auth = useAuth();

  return (
    <ProtectedPage>
      <main className="mx-auto max-w-4xl py-12">
        <h1
          className={twJoin(brixtonWood.className, 'mb-8 text-6xl uppercase')}
        >
          Dashboard
        </h1>

        <section className="mx-auto max-w-4xl p-5">
          <nav className="wrap mb-12 flex justify-center gap-x-8 gap-y-3 text-lg">
            {auth.user && auth.user.role !== 'admin' && (
              <Link
                href="/panel"
                className="bg-accent text-background rounded px-6 py-3"
              >
                <LuCar className="mr-2 inline" />
                Panel de atención
              </Link>
            )}
            <Link
              href="/orders"
              className="bg-accent text-background rounded px-6 py-3"
            >
              <LuNewspaper className="mr-2 inline" />
              Todos los pedidos
            </Link>
            {auth.user && auth.user.role === 'admin' && (
              <Link
                href="/catalog"
                className="bg-accent text-background rounded px-6 py-3"
              >
                <LuCar className="mr-2 inline" />
                Gestionar catálogo
              </Link>
            )}
          </nav>
        </section>

        <section className="mx-auto max-w-4xl p-5">
          <h2 className="mb-6 text-2xl font-semibold">Estadísticas</h2>
          <StatsPieChart />
        </section>

        <section className="mx-auto max-w-4xl p-5">
          <h2 className="mb-6 text-2xl font-semibold">
            Productos más populares
          </h2>
          <PopularProducts />
        </section>
      </main>
    </ProtectedPage>
  );
};

export default DashboardPage;
