import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    total: 0,
    itemCount: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      setLoading(true);
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartAPI.addToCart({ productId, quantity });
      setCart(response.data);
      toast.success('Added to cart!');
      fetchCart();
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    try {
      const response = await cartAPI.updateItem(cartItemId, { quantity });
      setCart(response.data);
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const response = await cartAPI.removeItem(cartItemId);
      setCart(response.data);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = () => {
    setCart({ items: [], total: 0, itemCount: 0 });
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
