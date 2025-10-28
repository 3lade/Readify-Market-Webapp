import api from './api';

const userService = {
  // Get all users (Admin only)
  getAllUsers: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  // Get stats for dashboard
  getStats: async () => {
    try {
      const [users, books, orders, reviews] = await Promise.all([
        api.get('/users'),
        api.get('/books'),
        api.get('/orders'),
        api.get('/reviews'),
      ]);

      return {
        totalUsers: users.data.length || 0,
        totalBooks: books.data.length || 0,
        totalOrders: orders.data.length || 0,
        totalReviews: reviews.data.length || 0,
      };
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stats' };
    }
  },
};

export default userService;