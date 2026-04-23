import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI, reviewAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getProductReviews(id);
      setReviews(response.data.reviews);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to write a review');
      return;
    }

    try {
      await reviewAPI.addReview({
        productId: id,
        ...reviewForm
      });
      toast.success('Review added!');
      fetchReviews();
      setReviewForm({ rating: 5, comment: '' });
    } catch (error) {
      toast.error('Failed to add review');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.product_name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          
          <div className="flex items-center gap-2 mb-4">
            <FaStar className="text-yellow-500 text-2xl" />
            <span className="text-2xl font-bold">{product.rating}</span>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>

          <p className="text-4xl font-bold text-primary mb-4">₹{Number(product.price).toFixed(2)}</p>
          
          <p className={`mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>

          <button
            onClick={() => addToCart(product.product_id)}
            disabled={product.stock === 0}
            className="btn-primary text-lg px-8 py-3 disabled:opacity-50"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="card p-6">
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

        <form onSubmit={handleAddReview} className="mb-8 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Rating</label>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
              className="input-field"
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Comment</label>
            <textarea
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              className="input-field"
              rows="3"
              required
            />
          </div>

          <button type="submit" className="btn-primary">Submit Review</button>
        </form>

        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.review_id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold">{review.rating}/5</span>
                <span className="text-gray-600">- {review.full_name}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
