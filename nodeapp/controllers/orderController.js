const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Book = require('../models/book');
const mongoose = require('mongoose');

const addOrder = async (req, res) => {
  try {
    const { orderItems, user, shippingAddress, billingAddress } = req.body;
    
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item.' });
    }
    
    // Create empty order first
    const newOrder = new Order({
      user: new mongoose.Types.ObjectId(user),
      orderItems: [],
      totalAmount: 0,
      orderStatus: 'Pending',
      shippingAddress,
      billingAddress
    });
    
    const savedOrder = await newOrder.save();
    
    let totalCost = 0;
    const createdOrderItems = [];
    
    // Process each order item
    for (const item of orderItems) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res.status(404).json({ message: `Book with ID ${item.bookId} not found` });
      }
      
      if (book.stockQuantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for book: ${book.title}` });
      }
      
      // Update book stock
      book.stockQuantity -= item.quantity;
      await book.save();
      
      // Create order item
      const orderItem = new OrderItem({
        quantity: item.quantity,
        price: book.price,
        book: book._id,
        order: savedOrder._id
      });
      
      const savedOrderItem = await orderItem.save();
      createdOrderItems.push(savedOrderItem._id);
      totalCost += book.price * item.quantity;
    }
    
    // Update order with items and total
    savedOrder.orderItems = createdOrderItems;
    savedOrder.totalAmount = totalCost;
    await savedOrder.save();
    
    res.status(201).json({ message: 'Order Placed Successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'username email mobileNumber')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'book',
          select: 'title category coverImage price'
        }
      })
      .exec();
    
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'username email mobileNumber')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'book',
          select: 'title category coverImage price'
        }
      });
    
    if (!order) {
      return res.status(404).json({ message: `Cannot find any order with ID ${req.params.id}` });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('user', 'username email mobileNumber')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'book',
          select: 'title category coverImage price'
        }
      });
    
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ message: `Cannot find any order with ID ${req.params.id}` });
    }
    res.status(200).json({ message: 'Order Updated Successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: `Cannot find any order with ID ${req.params.id}` });
    }
    res.status(200).json({ message: 'Order Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder
};