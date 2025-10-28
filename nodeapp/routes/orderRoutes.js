const express = require('express');
const { 
  addOrder, 
  getAllOrders, 
  getOrderById, 
  getOrdersByUserId, 
  updateOrder, 
  deleteOrder 
} = require('../controllers/orderController');
const { validateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/', addOrder);
router.get('/', getAllOrders);
router.get('/user/:userId', validateToken, getOrdersByUserId);
router.get('/:id', getOrderById);
router.put('/:id', validateToken, updateOrder);
router.delete('/:id', validateToken, deleteOrder);

module.exports = router;