'use client';

import GoBackButton from '@/components/GoBackButton';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import { RegisterRequest } from '@/schemas/register-request';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';

const RegisterPage = () => {
  const apiClients = useApiClients();

  const form = useForm({
    resolver: zodResolver(RegisterRequest),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterRequest) => {
    const res = await apiClients.users.register({ body: data });

    if (res.status === 409) {
      alert('Correo ya registrado.');
      return;
    }

    // eslint-disable-next-line react-hooks/immutability
    window.location.href = '/login';
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
        Regístrate
      </h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="my-6 space-y-5">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="border-muted block w-full rounded border px-3 py-4"
          {...form.register('email', { required: true })}
        />
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="border-muted block w-full rounded border px-3 py-4"
          {...form.register('username', { required: true })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border-muted block w-full rounded border px-3 py-4"
          {...form.register('password', { required: true })}
        />
        <select
          className="border-muted block w-full rounded border px-3 py-4"
          {...form.register('role', { required: true })}
        >
          <option disabled>¿Qué tipo de usuario eres?</option>
          <option value="cook">cocinero</option>
          <option value="dispatcher">despachador</option>
          <option value="driver">conductor</option>
          <option value="admin">administrador</option>
        </select>
        <button className="bg-accent text-background block w-full cursor-pointer rounded px-3 py-3 transition-all hover:brightness-85">
          Registrarse
        </button>
      </form>
    </main>
  );
};

export default RegisterPage;
