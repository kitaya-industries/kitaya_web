'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  hydrated: boolean; // true once localStorage has been loaded — consumers should wait for this
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

// ── localStorage helpers ───────────────────────────────────────────────────────
const CART_KEY = 'kitaya_cart';
const CART_EXPIRY_DAYS = 7;

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const { items, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(CART_KEY);
      return [];
    }
    return items as CartItem[];
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  try {
    const expiresAt = Date.now() + CART_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(CART_KEY, JSON.stringify({ items, expiresAt }));
  } catch {
    // Private browsing / storage full — fail silently
  }
}

// ── Context ────────────────────────────────────────────────────────────────────
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    setItems(loadCartFromStorage());
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change (only after hydration)
  useEffect(() => {
    if (hydrated) {
      saveCartToStorage(items);
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.slug === product.slug);
      if (existing) {
        return prev.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((item) => item.product.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.product.slug !== slug));
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.slug === slug ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    try { localStorage.removeItem(CART_KEY); } catch { /* ignore */ }
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, hydrated, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}