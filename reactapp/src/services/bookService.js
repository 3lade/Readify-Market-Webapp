import api from './api';

const bookService = {
  // Get all books
  getAllBooks: async () => {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch books' };
    }
  },

  // Get book by ID
  getBookById: async (bookId) => {
    try {
      const response = await api.get(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch book' };
    }
  },

  // Add new book (Admin only)
  addBook: async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add book' };
    }
  },

  // Update book (Admin only)
  updateBook: async (bookId, bookData) => {
    try {
      const response = await api.put(`/books/${bookId}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update book' };
    }
  },

  // Delete book (Admin only)
  deleteBook: async (bookId) => {
    try {
      const response = await api.delete(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete book' };
    }
  },
};

export default bookService;