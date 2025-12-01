'use client';

import { brixtonWood } from '@/fonts';
import { useRouter } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main className="px-4 py-20">
      <h1
        className={twJoin(
          brixtonWood.className,
          'text-center text-6xl uppercase',
        )}
      >
        Página no encontrada
      </h1>
      <div className="my-6 flex justify-center text-lg">
        <button
          onClick={() => router.back()}
          className="bg-accent text-background rounded px-6 py-3"
        >
          Volver
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;
