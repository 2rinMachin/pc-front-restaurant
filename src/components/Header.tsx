'use client';

import { useAuth } from '@/hooks/use-auth';
import { UserRole } from '@/schemas/user';
import Link from 'next/link';
import AccountButton from './AccountButton';
import Logo from './icons/Logo';

interface Link {
  label: string;
  href: string;
  allowedRoles?: UserRole[];
}

const links: Link[] = [
  {
    label: 'Panel de atención',
    href: '/panel',
    allowedRoles: ['cook', 'dispatcher', 'driver', 'admin'],
  },
  {
    label: 'Todos los pedidos',
    href: '/orders',
    allowedRoles: ['admin'],
  },
] as const;

const Header = () => {
  const auth = useAuth();

  const linkFilter = (link: Link) =>
    !link.allowedRoles ||
    (auth.user && link.allowedRoles.includes(auth.user.role));

  return (
    <header className="bg-accent flex px-4 py-2 text-white">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <div className="flex items-center gap-x-6">
          <Link
            href="/"
            className="flex items-center gap-x-4 text-xl font-semibold"
          >
            <Logo /> Restaurante
          </Link>
          <nav className="flex items-center gap-x-3">
            {links.filter(linkFilter).map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-x-1">
          <AccountButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
