const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authenticateToken = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', paymentController.createPayment);
router.get('/order/:orderId', paymentController.getPaymentByOrder);

module.exports = router;
