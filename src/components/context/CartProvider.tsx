'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { CartContext, CartItem } from './CartContext';

export interface Props {
  children: ReactNode | ReactNode[];
}

const STORAGE_KEY = 'cart';

const CartProvider = ({ children }: Props) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product_id: string, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product_id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product_id, quantity }];
    });
  };

  const updateQty = (product_id: string, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(product_id);
    }
    setItems((prev) =>
      prev.map((i) => (i.product_id === product_id ? { ...i, quantity } : i)),
    );
  };

  const removeItem = (product_id: string) => {
    setItems((prev) => prev.filter((i) => i.product_id !== product_id));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      totalItems,
      addItem,
      updateQty,
      removeItem,
      clearCart,
    }),
    [items, totalItems],
  );

  return <CartContext value={value}>{children}</CartContext>;
};

export default CartProvider;
