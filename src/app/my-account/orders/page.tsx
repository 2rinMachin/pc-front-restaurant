'use client';

import LoadingScreen from '@/components/LoadingScreen';
import OrderCard from '@/components/OrderCard';
import { useApiClients } from '@/hooks/use-api-clients';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

const UserOrdersPage = () => {
  const apiClients = useApiClients();
  const auth = useAuth();

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', `user=${auth.user?.user_id}`],
    queryFn: () => {
      console.log('auth id:', auth.user?.user_id);
      return auth.user
        ? apiClients.orders.getAllOrders({
            query: { client_id: auth.user.user_id },
          })
        : null;
    },
  });

  if (isLoading || auth.loading || !orders) return <LoadingScreen />;

  if (error) {
    console.error(error);
    return <main>Algo salió mal :(</main>;
  }

  return (
    <main className="px-6 py-8">
      <ul className="space-y-4">
        {orders.body.items.map((order) => (
          <Link
            key={order.order_id}
            href={`/my-account/orders/track?id=${order.order_id}`}
            className="block"
          >
            <OrderCard
              showStatus
              order={order}
              showAction={false}
              actionEnabled={false}
            />
          </Link>
        ))}
      </ul>
    </main>
  );
};

export default UserOrdersPage;
