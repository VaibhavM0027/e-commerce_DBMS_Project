const authenticateToken = require('./authMiddleware');

// Admin authorization middleware
const authorizeAdmin = (req, res, next) => {
  // First authenticate the token
  authenticateToken(req, res, (err) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    next();
  });
};

module.exports = authorizeAdmin;
