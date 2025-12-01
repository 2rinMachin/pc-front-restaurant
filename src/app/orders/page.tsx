'use client';

import LoadingScreen from '@/components/LoadingScreen';
import OrderCard from '@/components/OrderCard';
import ProtectedPage from '@/components/ProtectedPage';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import { useAuth } from '@/hooks/use-auth';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

const AllOrdersPage = () => {
  const auth = useAuth();
  const apiClients = useApiClients();

  const {
    data: orders,
    isLoading,
    error: error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: ({ pageParam }: { pageParam: string | null }) =>
      apiClients.orders.getAllOrders({
        query: { last_key: pageParam ?? undefined, limit: 20 },
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.body.next_key,
  });

  if (auth.loading || isLoading || orders === undefined)
    return <LoadingScreen />;

  if (error) {
    console.error(error);
    return <main>Algo salió mal :(</main>;
  }

  const allOrders = orders.pages.flatMap((page) => page.body.items);

  return (
    <ProtectedPage>
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1
          className={twJoin(brixtonWood.className, 'mb-6 text-5xl uppercase')}
        >
          Historial completo de pedidos
        </h1>

        <ul className="space-y-4">
          {allOrders.map((order) => (
            <Link
              key={order.order_id}
              href={`/orders/info?id=${order.order_id}`}
              className="block"
            >
              <OrderCard
                order={order}
                actionEnabled={false}
                showAction={false}
                showStatus
              />
            </Link>
          ))}
        </ul>
        <div className="my-4 flex justify-center">
          <button
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
            className="bg-accent text-background rounded px-6 py-3"
          >
            Mostrar más
          </button>
        </div>
      </main>
    </ProtectedPage>
  );
};

export default AllOrdersPage;
