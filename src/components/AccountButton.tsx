'use client';

import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import Person from './icons/Person';
import PersonFilled from './icons/PersonFilled';

const AccountButton = () => {
  const auth = useAuth();

  const Icon = auth.user ? PersonFilled : Person;

  return (
    <Link
      href={auth.user ? '/my-account/details' : '/login'}
      className="flex cursor-pointer items-center gap-x-3 rounded-md p-3 transition-colors hover:bg-black/10 focus:outline-2 focus:outline-white"
    >
      {auth.user && <span>{auth.user.username}</span>}
      <Icon className="size-6" />
    </Link>
  );
};

export default AccountButton;
