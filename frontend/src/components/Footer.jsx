import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">ShopKart</h3>
            <p className="text-gray-400">
              Your one-stop destination for all your shopping needs. Quality products at best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-primary transition-colors">Products</Link></li>
              <li><Link to="/cart" className="text-gray-400 hover:text-primary transition-colors">Cart</Link></li>
              <li><Link to="/orders" className="text-gray-400 hover:text-primary transition-colors">Orders</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 ShopKart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
