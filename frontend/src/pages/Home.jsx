import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { FaFilter } from 'react-icons/fa';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category_id: '',
    sortBy: '',
    minPrice: '',
    maxPrice: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    if (search !== filters.search) {
      setFilters(prev => ({ ...prev, search }));
    }
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll(filters);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchCategories = async () => {
    try {
      const response = await productAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category_id: '',
      sortBy: '',
      minPrice: '',
      maxPrice: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-secondary via-gray-800 to-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-4 animate-fade-in">Welcome to ShopKart</h1>
          <p className="text-2xl mb-8 text-gray-200">Discover Amazing Products at Unbeatable Prices</p>
          <div className="flex justify-center gap-4">
            <span className="bg-primary text-secondary px-4 py-2 rounded-full font-semibold">Free Shipping</span>
            <span className="bg-primary text-secondary px-4 py-2 rounded-full font-semibold">Best Prices</span>
            <span className="bg-primary text-secondary px-4 py-2 rounded-full font-semibold">24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Filter Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-800">
              {filters.search ? `Search: "${filters.search}"` : 'All Products'}
            </h2>
            <p className="text-gray-600 mt-2">{products.length} products found</p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2 px-6 py-3 shadow-md hover:shadow-lg transition-all"
          >
            <FaFilter /> {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="card p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select
                  value={filters.category_id}
                  onChange={(e) => handleFilterChange('category_id', e.target.value)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="input-field"
                >
                  <option value="">Default</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Min Price</label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  placeholder="₹0"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Max Price</label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  placeholder="₹100000"
                  className="input-field"
                />
              </div>
            </div>

            <button onClick={clearFilters} className="mt-4 btn-secondary">
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
