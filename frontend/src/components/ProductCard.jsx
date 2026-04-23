import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.product_id);
  };

  return (
    <Link to={`/product/${product.product_id}`} className="card overflow-hidden group transform hover:-translate-y-2 transition-all duration-300">
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
          }}
        />
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            🔥 Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ❌ Out of Stock
          </span>
        )}
        {product.rating >= 4.5 && (
          <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            ⭐ Top Rated
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors min-h-[3rem]">
          {product.product_name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold text-primary">
              ₹{Number(product.price).toFixed(2)}
            </span>
            {product.stock > 0 && product.stock <= 50 && (
              <p className="text-xs text-green-600 mt-1">✅ In Stock</p>
            )}
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <FaStar className="text-yellow-500" />
            <span className="font-bold text-sm">{product.rating}</span>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-3 font-semibold shadow-md hover:shadow-lg transition-all"
        >
          {product.stock === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
