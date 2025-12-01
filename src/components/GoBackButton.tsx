'use client';

import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import LeftArrow from './icons/LeftArrow';

export interface Props extends HTMLAttributes<HTMLButtonElement> {}

const GoBackButton = ({ className, ...props }: Props) => {
  const router = useRouter();

  return (
    <button
      {...props}
      onClick={() => router.back()}
      className={twMerge(
        className,
        'outline-text text-accent flex cursor-pointer items-center gap-x-1 rounded px-2 py-3 focus:outline-2',
      )}
    >
      <LeftArrow className="size-6" />
      <span>Volver</span>
    </button>
  );
};

export default GoBackButton;
