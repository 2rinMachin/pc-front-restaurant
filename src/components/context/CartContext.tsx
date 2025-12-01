'use client';

import { createContext } from 'react';

export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  addItem: (product_id: string, quantity: number) => void;
  updateQty: (product_id: string, quantity: number) => void;
  removeItem: (product_id: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
