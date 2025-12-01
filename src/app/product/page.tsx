'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { useApiClients } from '@/hooks/use-api-clients';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/util';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { PopularProducts } from '../../components/PopularProducts';

const ProductPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product_id');

  const apiClients = useApiClients();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', productId],
    queryFn: () =>
      productId
        ? apiClients.catalog.getProductById({
            params: { id: productId },
          })
        : null,
    enabled: !!productId,
  });

  const [qty, setQty] = useState(1);

  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product.product_id, qty);
    console.log('Añadiendo al carrito:', { product: data?.body, qty });
  };

  if (!productId) {
    return (
      <main className="p-6 text-center text-red-500">Producto inválido</main>
    );
  }

  if (isLoading || !data) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <main className="p-6 text-center text-red-500">
        Error al cargar el producto.
      </main>
    );
  }

  if (data.status === 404) {
    return (
      <main className="p-6 text-center text-red-500">
        Producto no encontrado.
      </main>
    );
  }

  const product = data.body;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-lg p-6 shadow">
        {product.image_url && (
          <div className="relative mb-8 h-80 w-full">
            <Image
              src={product.image_url}
              unoptimized
              alt="product"
              fill
              className="rounded object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl font-semibold">{product.name}</h1>

        <div className="mt-4 flex items-baseline gap-x-2">
          <span className="text-muted text-sm">Precio:</span>
          <span className="text-accent text-2xl font-bold">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={dec}
              className="h-8 w-8 rounded-md border text-lg font-semibold"
            >
              –
            </button>

            <span className="w-8 text-center text-lg">{qty}</span>

            <button
              onClick={inc}
              className="h-8 w-8 rounded-md border text-lg font-semibold"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-accent rounded-md px-5 py-2 font-medium text-white"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </main>
  );
};

const ProductPageStatic = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ProductPage />
    </Suspense>
  );
};

export default ProductPageStatic;
