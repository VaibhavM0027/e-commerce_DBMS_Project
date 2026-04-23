import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm}`);
    }
  };

  return (
    <nav className="bg-secondary text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBars className="text-2xl" />
            <span className="text-2xl font-bold text-primary">ShopKart</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 hidden md:flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name..."
              className="w-full px-5 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-yellow-600 px-8 py-3 rounded-r-lg transition-colors font-semibold"
            >
              <FaSearch className="text-lg" />
            </button>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="hover:text-primary transition-colors">
                    Admin
                  </Link>
                ) : (
                  <Link to="/dashboard" className="hover:text-primary transition-colors flex items-center gap-2">
                    <FaUser />
                    <span className="hidden sm:inline">{user.full_name}</span>
                  </Link>
                )}
                
                <Link to="/cart" className="relative hover:text-primary transition-colors">
                  <FaShoppingCart className="text-2xl" />
                  {cart.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-secondary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.itemCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={handleLogout}
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-yellow-600 px-4 py-2 rounded-r-lg"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
