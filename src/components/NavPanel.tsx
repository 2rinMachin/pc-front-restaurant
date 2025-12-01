'use client';

import GoBackButton from '@/components/GoBackButton';
import Person from '@/components/icons/Person';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin, twMerge } from 'tailwind-merge';
import LogOut from './icons/LogOut';

const links = [
  { href: '/my-account/details', label: 'Mis Detalles', Icon: Person },
] as const;

const NavPanel = () => {
  const apiClients = useApiClients();
  const pathname = usePathname();

  const logOut = async () => {
    try {
      await apiClients.users.logout();
    } finally {
      localStorage.removeItem('sessionToken');
      window.location.href = '/';
    }
  };

  return (
    <aside className="h-full w-80 rounded-lg bg-white p-4 shadow-sm">
      <div className="my-1">
        <GoBackButton />
      </div>
      <h1
        className={twJoin(
          brixtonWood.className,
          'mb-3 text-5xl font-normal uppercase',
        )}
      >
        Cuenta
      </h1>
      <nav className="flex flex-col">
        {links.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={twMerge(
                'flex px-4 py-3 text-base font-medium transition-colors',
                active
                  ? 'text-accent bg-accent/10 font-semibold'
                  : 'hover:bg-gray-100',
              )}
            >
              <item.Icon
                className={twMerge('mr-10 h-6 w-6', active && 'text-accent')}
              />
              {item.label}
            </Link>
          );
        })}
        <hr className="my-2 border border-neutral-300" />
        <button
          onClick={logOut}
          className="flex rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100"
        >
          <LogOut className="mr-10 h-6 w-6" />
          Cerrar Sesión
        </button>
      </nav>
    </aside>
  );
};

export default NavPanel;
