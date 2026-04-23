const Cart = require('../models/Cart');

// Get user cart
exports.getCart = async (req, res) => {
  try {
    const cartId = await Cart.getOrCreateCart(req.user.userId);
    const items = await Cart.getCartItems(cartId);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      success: true,
      cartId,
      items,
      total,
      itemCount: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message
    });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cartId = await Cart.getOrCreateCart(req.user.userId);

    await Cart.addItem(cartId, productId, quantity);

    const items = await Cart.getCartItems(cartId);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      success: true,
      message: 'Item added to cart',
      cartId,
      items,
      total,
      itemCount: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message
    });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItemId = req.params.id;

    await Cart.updateQuantity(cartItemId, quantity);

    const cartId = await Cart.getOrCreateCart(req.user.userId);
    const items = await Cart.getCartItems(cartId);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      success: true,
      message: 'Cart updated',
      items,
      total,
      itemCount: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update cart',
      error: error.message
    });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const cartItemId = req.params.id;

    await Cart.removeItem(cartItemId);

    const cartId = await Cart.getOrCreateCart(req.user.userId);
    const items = await Cart.getCartItems(cartId);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json({
      success: true,
      message: 'Item removed from cart',
      items,
      total,
      itemCount: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart',
      error: error.message
    });
  }
};
