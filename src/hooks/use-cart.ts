'use client';

import { CartContext } from '@/components/context/CartContext';
import { useContext } from 'react';

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
};
