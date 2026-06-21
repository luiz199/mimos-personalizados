'use client';
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product } from './products';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  count: number;
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
}

const CartContext = createContext<CartContextType>(null!);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mimos-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem('mimos-cart', JSON.stringify(items)) } catch {}
  }, [items]);

  const add = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((acc, i) => acc + i.quantity, 0);
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, add, remove, clear, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
