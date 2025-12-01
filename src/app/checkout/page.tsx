'use client';

import { useApiClients } from '@/hooks/use-api-clients';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/schemas/product';
import { formatPrice } from '@/util';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface CheckoutItem {
  product: Product;
  quantity: number;
}

const CheckoutPage = () => {
  const { items, clearCart } = useCart();
  const apiClients = useApiClients();
  const router = useRouter();

  const { data } = useQuery<CheckoutItem[]>({
    queryKey: ['checkout-products', items],
    queryFn: async () => {
      const products = await Promise.all(
        items.map((i) =>
          apiClients.catalog.getProductById({
            params: { id: i.product_id },
          }),
        ),
      );

      return products.map((p, idx) => {
        const product = p.body as Product;

        return {
          product,
          quantity: items[idx].quantity,
        };
      });
    },
    enabled: items.length > 0,
  });

  const total =
    data?.reduce((sum, i) => sum + i.product.price * i.quantity, 0) ?? 0;

  const handleConfirm = async () => {
    if (!data) return;

    const res = await apiClients.orders.createOrder({
      body: {
        items: data.map((i) => ({
          product_id: i.product.product_id,
          quantity: i.quantity,
        })),
      },
    });

    clearCart();
    router.push(`/my-account/orders/track?id=${res.body.order_id}`);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Resumen de tu compra</h1>

      <ul className="space-y-4">
        {data?.map(({ product, quantity }) => (
          <li
            key={product.product_id}
            className="flex justify-between border-b pb-3"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-black/60">
                {quantity} × {formatPrice(product.price)}
              </p>
            </div>
            <p className="font-semibold">
              {formatPrice(product.price * quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-xl font-semibold">
        Total: {formatPrice(total)}
      </div>

      <button
        onClick={handleConfirm}
        className="mt-6 w-full rounded-md bg-black py-3 font-medium text-white hover:bg-black/80"
      >
        Confirmar pedido
      </button>
    </main>
  );
};

export default CheckoutPage;
