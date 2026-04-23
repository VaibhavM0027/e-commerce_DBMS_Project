import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map(item => (
            <div key={item.cart_item_id} className="card p-4 flex gap-4">
              <img
                src={item.image_url}
                alt={item.product_name}
                className="w-32 h-32 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.product_name}</h3>
                <p className="text-2xl font-bold text-primary mb-2">₹{Number(item.price).toFixed(2)}</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.cart_item_id, Math.max(1, item.quantity - 1))}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cart_item_id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.cart_item_id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Items ({cart.itemCount})</span>
                <span>₹{Number(cart.total).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">₹{Number(cart.total).toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="w-full btn-primary block text-center">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
