import api from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      const { user, token } = response.data;
      
      // Store auth data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.username);
      localStorage.setItem('userRole', user.userRole);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  },

  // Get current user info from localStorage
  getCurrentUser: () => {
    return {
      id: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      userRole: localStorage.getItem('userRole'),
      token: localStorage.getItem('token'),
    };
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Check if user is admin
  isAdmin: () => {
    return localStorage.getItem('userRole') === 'Admin';
  },
};

export default authService;