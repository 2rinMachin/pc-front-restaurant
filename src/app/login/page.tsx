'use client';

import GoBackButton from '@/components/GoBackButton';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import { LoginRequest } from '@/schemas/login-request';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

const LoginPage = () => {
  const apiClients = useApiClients();

  const form = useForm({
    resolver: zodResolver(LoginRequest),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    const res = await apiClients.users.login({ body: data });

    if (res.status === 401) {
      alert('Credenciales incorrectas.');
      return;
    }

    localStorage.setItem('sessionToken', res.body.token);
    // eslint-disable-next-line react-hooks/immutability
    window.location.href = '/';
  };

  return (
    <main className="mx-auto my-6 max-w-lg">
      <div className="my-1">
        <GoBackButton />
      </div>
      <h1
        className={twJoin(
          brixtonWood.className,
          'mb-3 text-5xl font-normal uppercase',
        )}
      >
        Iniciar sesión
      </h1>
      <p>
        Usuario nuevo?{' '}
        <Link href="/register" className="text-link underline">
          Crear una cuenta
        </Link>
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-6 space-y-5">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="border-muted block w-full rounded border px-3 py-4"
          {...form.register('email', { required: true })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border-muted block w-full rounded border px-3 py-4"
          {...form.register('password', { required: true })}
        />
        <button className="bg-accent text-background block w-full cursor-pointer rounded px-3 py-3 transition-all hover:brightness-85">
          Iniciar Sesión
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
