'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { useAuth } from '@/hooks/use-auth';
import { roleLabels } from '@/lang';
import { redirect } from 'next/navigation';
import { LuMail, LuUser } from 'react-icons/lu';

const UserDetailsPage = () => {
  const auth = useAuth();

  if (auth.loading) return <LoadingScreen />;

  if (!auth.user) redirect('/');

  return (
    <main className="px-6 py-4">
      <LuUser className="mx-auto my-6 block size-28 rounded-full bg-neutral-200 p-2" />
      <h2 className="mb-8 text-center text-2xl font-semibold">
        {auth.user.username}
      </h2>
      <div className="space-y-2">
        <p className="text-center text-lg">
          <LuMail className="mr-2 inline stroke-3" /> {auth.user.email}
        </p>
        {auth.user.role !== 'client' && (
          <p className="text-center text-lg">
            <LuUser className="mr-1 inline stroke-3" />{' '}
            {roleLabels[auth.user.role]}
          </p>
        )}
      </div>
    </main>
  );
};

export default UserDetailsPage;
