import api from './api';

const orderService = {
  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create order' };
    }
  },

  // Get all orders (Admin only)
  getAllOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch orders' };
    }
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch order' };
    }
  },

  // Get orders by user ID
  getUserOrders: async (userId) => {
    try {
      const response = await api.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user orders' };
    }
  },

  // Update order (Admin only)
  updateOrder: async (orderId, orderData) => {
    try {
      const response = await api.put(`/orders/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update order' };
    }
  },

  // Delete order (Admin only)
  deleteOrder: async (orderId) => {
    try {
      const response = await api.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete order' };
    }
  },
};

export default orderService;