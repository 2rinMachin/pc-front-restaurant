'use client';

import { useQuery } from '@tanstack/react-query';

interface Product {
  product_id: string;
  product_name: string;
  total_quantity: string;
}

export const PopularProducts = () => {
  const { data } = useQuery<Product[]>({
    queryKey: ['analytics', 'popular-products'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYTICS_URL}/popular-products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
          },
        },
      );
      if (!res.ok) throw new Error('Error al cargar los productos populares');
      return res.json();
    },
  });

  if (!data || data.length === 0) return null;

  return (
    <table className="w-full border-t border-b border-neutral-200 text-lg">
      <thead>
        <tr className="border-b border-neutral-200">
          <th className="text-left px-4 py-3">Nombre del producto</th>
          <th className="text-right px-4 py-3">Unidades vendidas</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
          <tr key={product.product_id} className="border-b border-neutral-200">
            <td className="px-4 py-3">{product.product_name}</td>
            <td className="px-4 py-3 text-right font-semibold">{product.total_quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
