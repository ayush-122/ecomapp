'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCart, addToCart, updateCartItem, removeFromCart } from '../lib/app';

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  addItem: (productId: string) => Promise<void>;
  updateItem: (id: string, quantity: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const userId = 'default-user'; // In a real app, this would come from authentication

  const loadCart = async () => {
    setIsLoading(true);
    try {
      const cartData = await fetchCart(userId);
      setItems(cartData.items);
      setTotal(cartData.total);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const addItem = async (productId: string) => {
    try {
      await addToCart(productId, userId);
      await loadCart();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const updateItem = async (id: string, quantity: number) => {
    try {
      await updateCartItem(id, quantity);
      await loadCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await removeFromCart(id);
      await loadCart();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ items, total, isLoading, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};