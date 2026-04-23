import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    payment_method: 'Credit Card',
    shipping_address: user?.address || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await orderAPI.placeOrder(formData);
      clearCart();
      navigate('/order-success', { state: { orderId: response.data.orderId } });
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="card p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <textarea
              value={formData.shipping_address}
              onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
              className="input-field"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Payment Method</label>
            <select
              value={formData.payment_method}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              className="input-field"
            >
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>UPI</option>
              <option>Net Banking</option>
              <option>Cash on Delivery</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Processing...' : `Pay ₹${Number(cart.total).toFixed(2)}`}
          </button>
        </form>

        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.items.map(item => (
              <div key={item.cart_item_id} className="flex justify-between">
                <span>{item.product_name} x {item.quantity}</span>
                <span>₹{Number(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-primary">₹{Number(cart.total).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
