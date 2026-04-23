const { verifyToken } = require('../utils/jwtUtils');

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }

  req.user = decoded;
  next();
};

module.exports = authenticateToken;
