import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth APIs
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getProfile: () => API.get('/auth/profile'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

// Product APIs
export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  getCategories: () => API.get('/products/categories'),
};

// Cart APIs
export const cartAPI = {
  getCart: () => API.get('/cart'),
  addToCart: (data) => API.post('/cart/add', data),
  updateItem: (id, data) => API.put(`/cart/${id}`, data),
  removeItem: (id) => API.delete(`/cart/${id}`),
};

// Order APIs
export const orderAPI = {
  placeOrder: (data) => API.post('/orders/place', data),
  getUserOrders: () => API.get('/orders'),
  getOrderDetails: (id) => API.get(`/orders/${id}`),
};

// Review APIs
export const reviewAPI = {
  addReview: (data) => API.post('/reviews', data),
  getProductReviews: (productId) => API.get(`/reviews/product/${productId}`),
};

// Admin APIs
export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
  getAllOrders: () => API.get('/admin/orders'),
  updateOrderStatus: (id, data) => API.put(`/admin/orders/${id}/status`, data),
  getAllUsers: () => API.get('/admin/users'),
  addProduct: (data) => API.post('/admin/products', data),
  updateProduct: (id, data) => API.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => API.delete(`/admin/products/${id}`),
};

export default API;
