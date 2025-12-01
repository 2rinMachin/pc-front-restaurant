'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import { formatPrice } from '@/util';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';

const CatalogPage = () => {
  const apiClients = useApiClients();

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => apiClients.catalog.getAllProducts(),
  });

  if (!products || isLoading) return <LoadingScreen />;

  if (error) {
    return <main>Algo salió mal :(</main>;
  }

  return (
    <main className="mx-auto max-w-4xl py-12">
      <h1 className={twJoin(brixtonWood.className, 'mb-8 text-6xl uppercase')}>
        Catálogo
      </h1>
      <div className="mb-8">
        <Link
          href="/catalog/add"
          className="bg-accent text-background rounded px-6 py-4"
        >
          <LuPlus className="mr-2 inline stroke-3" />
          Añadir producto
        </Link>
      </div>
      <ul className="grid grid-cols-3 gap-3">
        {products.body.map((product) => (
          <li key={product.product_id} className="rounded shadow-lg">
            {product.image_url && (
              <div className="relative mb-8 h-30 w-full">
                <Image
                  src={product.image_url}
                  unoptimized
                  alt="product"
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}

            <Link
              href={`/catalog/product?id=${product.product_id}`}
              className="block h-full px-4 py-3"
            >
              <div className="mb-4 text-lg uppercase">{product.name}</div>
              <div>{formatPrice(product.price)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CatalogPage;
