import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getUserOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-500',
      'Packed': 'bg-blue-500',
      'Shipped': 'bg-purple-500',
      'Delivered': 'bg-green-500',
      'Cancelled': 'bg-red-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl mb-4">No orders yet</p>
          <Link to="/" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.order_id} className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Order #{order.order_id}</h3>
                  <p className="text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <span className={`${getStatusColor(order.order_status)} text-white px-4 py-2 rounded font-semibold`}>
                  {order.order_status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-lg">{order.item_count} items</p>
                <p className="text-2xl font-bold text-primary">₹{Number(order.total_amount).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
