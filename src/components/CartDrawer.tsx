'use client';

import { useApiClients } from '@/hooks/use-api-clients';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/util';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

interface CartProduct {
  product_id: string;
  name: string;
  image_url?: string | null;
  price: number;
  quantity: number;
}

const CartDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { items, updateQty, removeItem } = useCart();
  const apiClients = useApiClients();

  const { data } = useQuery<CartProduct[]>({
    queryKey: ['cart-products', items],
    queryFn: async () => {
      const responses = await Promise.all(
        items.map((i) =>
          apiClients.catalog.getProductById({ params: { id: i.product_id } }),
        ),
      );

      return responses.map((r, idx) => {
        const body = r.body as {
          product_id: string;
          name: string;
          image_url?: string | null;
          price: number;
        };

        return {
          product_id: body.product_id,
          name: body.name,
          image_url: body.image_url ?? null,
          price: body.price ?? 0,
          quantity: items[idx].quantity,
        };
      });
    },
    enabled: items.length > 0,
  });

  const cartProducts = data ?? [];
  const total = cartProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="absolute top-0 right-0 h-full w-80 bg-white p-4 text-black shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">Tu carrito</h2>

        {cartProducts.length === 0 && (
          <p className="text-black/60">Carrito vacío</p>
        )}

        <ul className="space-y-4">
          {cartProducts.map((p) => (
            <li
              key={p.product_id}
              className="flex items-center gap-3 border-b border-black/10 pb-3"
            >
              {p.image_url && (
                <Image
                  src={p.image_url}
                  alt={p.name}
                  width={60}
                  height={60}
                  className="rounded-md border border-black/10"
                />
              )}

              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-black/60">{formatPrice(p.price)}</p>

                <div className="mt-2 flex items-center gap-2">
                  <button
                    onClick={() => updateQty(p.product_id, p.quantity - 1)}
                    className="rounded-md border border-black/20 px-2 py-0.5 hover:bg-black/5"
                  >
                    –
                  </button>

                  <span className="min-w-5 text-center">{p.quantity}</span>

                  <button
                    onClick={() => updateQty(p.product_id, p.quantity + 1)}
                    className="rounded-md border border-black/20 px-2 py-0.5 hover:bg-black/5"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeItem(p.product_id)}
                className="px-2 py-1 font-bold text-red-500 hover:text-red-600"
              >
                X
              </button>
            </li>
          ))}
        </ul>

        {cartProducts.length > 0 && (
          <>
            <div className="mt-6 text-lg font-semibold">
              Total: {formatPrice(total)}
            </div>

            <Link
              href="/checkout"
              onClick={onClose}
              className="mt-4 block rounded-md bg-black py-3 text-center font-medium text-white hover:bg-black/80"
            >
              Ir al pago
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
