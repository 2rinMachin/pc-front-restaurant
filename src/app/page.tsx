'use client';

import ProtectedPage from '@/components/ProtectedPage';
import { brixtonWood } from '@/fonts';
import { twJoin } from 'tailwind-merge';
import { PopularProducts } from '../components/PopularProducts';
import { StatsPieChart } from '../components/StatsPieChart';

const DashboardPage = () => (
  <ProtectedPage>
    <main className="mx-auto max-w-4xl py-12">
      <h1 className={twJoin(brixtonWood.className, 'mb-8 text-6xl uppercase')}>
        Dashboard
      </h1>

      <section className="mx-auto max-w-4xl p-5">
        <h2 className="mb-6 text-2xl font-semibold">Estadísticas</h2>
        <StatsPieChart />
      </section>

      <section className="mx-auto max-w-4xl p-5">
        <h2 className="mb-6 text-2xl font-semibold">Productos más populares</h2>
        <PopularProducts />
      </section>
    </main>
  </ProtectedPage>
);
export default DashboardPage;
