import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card p-8 text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-8xl mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-2">Thank you for your purchase</p>
        {orderId && (
          <p className="text-lg font-semibold mb-6">Order ID: #{orderId}</p>
        )}
        
        <div className="space-y-3">
          <Link to="/orders" className="w-full btn-primary block">
            View Orders
          </Link>
          <Link to="/" className="w-full btn-secondary block">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
