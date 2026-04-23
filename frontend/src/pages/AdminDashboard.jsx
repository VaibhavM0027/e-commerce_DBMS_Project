import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
    fetchOrders();
  }, []);

  const fetchDashboard = async () => {
    try {
      console.log('Fetching dashboard stats...');
      const response = await adminAPI.getStats();
      console.log('Dashboard response:', response.data);
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      console.error('Error response:', error.response?.data);
      toast.error(`Failed to load dashboard: ${error.response?.data?.message || error.message}`);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await adminAPI.getAllOrders();
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await adminAPI.updateOrderStatus(orderId, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">📊 Admin Dashboard</h1>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-primary text-secondary shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              📈 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-primary text-secondary shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              📦 Orders ({orders.length})
            </button>
          </div>

      {activeTab === 'dashboard' && stats && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 mb-2 text-sm font-semibold uppercase tracking-wide">Total Revenue</h3>
                  <p className="text-3xl font-bold text-blue-600">₹{stats.stats ? Number(stats.stats.totalRevenue).toFixed(2) : '0.00'}</p>
                </div>
                <div className="text-4xl">💰</div>
              </div>
            </div>
            <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 mb-2 text-sm font-semibold uppercase tracking-wide">Total Orders</h3>
                  <p className="text-3xl font-bold text-green-600">{stats.stats ? stats.stats.totalOrders : 0}</p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </div>
            <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 mb-2 text-sm font-semibold uppercase tracking-wide">Total Users</h3>
                  <p className="text-3xl font-bold text-purple-600">{stats.stats ? stats.stats.totalUsers : 0}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>
            <div className="card p-6 bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-600 mb-2 text-sm font-semibold uppercase tracking-wide">Low Stock Items</h3>
                  <p className="text-3xl font-bold text-red-600">{stats.stats ? stats.stats.lowStockCount : 0}</p>
                </div>
                <div className="text-4xl">⚠️</div>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          {stats.lowStock && stats.lowStock.length > 0 && (
            <div className="card p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">⚠️ Low Stock Alert</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.lowStock.map(product => (
                  <div key={product.product_id} className="border-2 border-red-200 p-4 rounded-lg bg-red-50">
                    <p className="font-semibold">{product.product_name}</p>
                    <p className="text-red-600 font-bold">Only {product.stock} left in stock</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Selling */}
          {stats.topSelling && stats.topSelling.length > 0 && (
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-4">🏆 Top Selling Products</h2>
              <div className="space-y-3">
                {stats.topSelling.map((product, idx) => (
                  <div key={product.product_id} className="flex justify-between items-center border-b pb-3 hover:bg-gray-50 p-2 rounded transition">
                    <div className="flex items-center gap-3">
                      <span className="bg-primary text-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold">{idx + 1}</span>
                      <span className="font-semibold">{product.product_name}</span>
                    </div>
                    <span className="font-bold text-green-600">{product.total_sold} sold</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-2xl text-gray-600">📦 No orders found</p>
            </div>
          ) : (
            orders.map(order => (
              <div key={order.order_id} className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Order #{order.order_id}</h3>
                    <p className="text-gray-600">{order.customer_name} - {order.customer_email}</p>
                    <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      order.order_status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.order_status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      order.order_status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      order.order_status === 'Packed' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.order_status}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-primary">₹{Number(order.total_amount).toFixed(2)}</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold mb-2">Update Status:</p>
                  <div className="flex gap-2 flex-wrap">
                    {['Pending', 'Packed', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(order.order_id, status)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          order.order_status === status
                            ? 'bg-primary text-secondary shadow-lg transform scale-105'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
