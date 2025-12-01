'use client';

import ProtectedPage from '@/components/ProtectedPage';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import { CreateProductRequest } from '@/schemas/create-product-requests';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

const AddProductPage = () => {
  const apiClients = useApiClients();

  const form = useForm({
    resolver: zodResolver(CreateProductRequest),
    defaultValues: {
      name: '',
      price: 0,
      image: null,
    },
  });

  const onSubmit = async (data: CreateProductRequest) => {
    const res = await apiClients.catalog.createProduct({ body: data });
    redirect(`/dashboard/catalog/product?id=${res.body.product_id}`);
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const image = form.watch('image');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      form.setValue('image', base64.split(',')[1]);
    };
    reader.readAsDataURL(file);
  };

  // TODO: add allowedRoles
  return (
    <ProtectedPage>
      <main className="mx-auto max-w-3xl py-12">
        <h1
          className={twJoin(brixtonWood.className, 'mb-8 text-6xl uppercase')}
        >
          Añadir producto
        </h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <label className="block">
            Imagen
            <input
              type="file"
              accept="image/*"
              className="border-muted block w-full rounded border px-3 py-4"
              onChange={handleImageUpload}
            />
            {image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`data:image/png;base64,${image}`}
                alt="preview"
                className="mt-4 h-40 w-auto rounded border"
              />
            )}
          </label>
          <button className="bg-accent text-background rounded px-6 py-3 text-lg">
            Añadir
          </button>
        </form>
      </main>
    </ProtectedPage>
  );
};

export default AddProductPage;
