import api from './api';

const reviewService = {
  // Get all reviews (Admin only)
  getAllReviews: async () => {
    try {
      const response = await api.get('/reviews');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch reviews' };
    }
  },

  // Get review by ID
  getReviewById: async (reviewId) => {
    try {
      const response = await api.get(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch review' };
    }
  },

  // Get reviews by user ID
  getUserReviews: async (userId) => {
    try {
      const response = await api.get(`/reviews/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user reviews' };
    }
  },

  // Get reviews by book ID
  getBookReviews: async (bookId) => {
    try {
      const response = await api.get(`/reviews/book/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch book reviews' };
    }
  },

  // Add new review
  addReview: async (reviewData) => {
    try {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add review' };
    }
  },

  // Update review
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await api.put(`/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update review' };
    }
  },

  // Delete review
  deleteReview: async (reviewId) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete review' };
    }
  },
};

export default reviewService;