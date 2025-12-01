'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import { UpdateProductRequest } from '@/schemas/update-product-requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { redirect, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LuSave, LuTrash } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';

const ProductPage = () => {
  const params = useSearchParams();

  const apiClients = useApiClients();
  const productId = params.get('id');

  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', productId],
    queryFn: () =>
      productId
        ? apiClients.catalog.getProductById({ params: { id: productId } })
        : null,
  });

  const form = useForm({ resolver: zodResolver(UpdateProductRequest) });

  useEffect(() => {
    if (productData?.status === 200) {
      form.setValue('name', productData.body.name);
      form.setValue('price', productData.body.price);
    }
  }, [productData, form]);

  if (!productId) return redirect('/catalog');

  if (isLoading || !productData) return <LoadingScreen />;

  if (error) {
    console.error(error);
    return <main>Algo salió mal :(</main>;
  }

  if (productData.status === 404) {
    return <main>Producto no encontrado.</main>;
  }

  const onSubmit = async (data: UpdateProductRequest) => {
    await apiClients.catalog.updateProduct({
      params: { id: productId },
      body: data,
    });

    alert('Cambios guardados!');
    window.location.reload();
  };

  const deleteProduct = async () => {
    await apiClients.catalog.deleteProduct({ params: { id: productId } });

    // eslint-disable-next-line react-hooks/immutability
    window.location.href = '/catalog';
  };

  const product = productData.body;

  // TODO: add allowedRoles
  return (
    <main className="mx-auto max-w-3xl py-12">
      <h1 className={twJoin(brixtonWood.className, 'mb-8 text-6xl uppercase')}>
        Información de producto
      </h1>

      {product.image_url && (
        <div className="relative mb-7 h-80 w-full">
          <Image
            src={product.image_url}
            unoptimized
            alt="product"
            fill
            className="rounded object-cover"
          />
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-x-3">
          <label className="block grow">
            Nombre del producto
            <input
              placeholder="Nombre del producto"
              className="border-muted block w-full rounded border px-3 py-4"
              {...form.register('name', { required: true })}
            />
            {form.formState.errors.name && (
              <p className="text-accent mt-2">
                {form.formState.errors.name.message}
              </p>
            )}
          </label>
          <label className="block min-w-2 shrink">
            Precio
            <input
              placeholder="Precio"
              type="number"
              step={0.01}
              className="border-muted block w-full min-w-1 rounded border px-3 py-4"
              {...form.register('price', { required: true, min: 0 })}
            />
            {form.formState.errors.price && (
              <p className="text-accent mt-2">
                {form.formState.errors.price.message}
              </p>
            )}
          </label>
        </div>
        <button className="bg-accent text-background rounded px-6 py-3 text-lg">
          <LuSave className="mr-2 inline" /> Guardar cambios
        </button>
      </form>

      <div className="mt-4">
        <button
          onClick={deleteProduct}
          className="border-accent rounded border-2 px-6 py-3 text-lg"
        >
          <LuTrash className="mr-2 inline" /> Borrar producto
        </button>
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
