import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from 'react-toast-notifications';
import { CartProvider } from './CartContext';
import store from './store';
import PrivateRoute from './Components/PrivateRoute';

// Components
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import ErrorPage from './Components/ErrorPage';

// Admin Components
import Dashboard from './AdminComponents/Dashboard';
import BookForm from './AdminComponents/BookForm';
import AdminViewBooks from './AdminComponents/AdminViewBooks';
import OrderPlaced from './AdminComponents/OrderPlaced';
import AdminViewReviews from './AdminComponents/AdminViewReviews';

// User Components
import UserViewBooks from './UserComponents/UserViewBooks';
import UserReview from './UserComponents/UserReview';
import UserMyReview from './UserComponents/UserMyReview';
import UserViewOrders from './UserComponents/UserViewOrders';
import Checkout from './UserComponents/Checkout';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider placement="top-right" autoDismiss autoDismissTimeout={3000}>
          <CartProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/error" element={<ErrorPage />} />

                {/* Protected Routes - Home */}
                <Route 
                  path="/" 
                  element={
                    <PrivateRoute>
                      <HomePage />
                    </PrivateRoute>
                  } 
                />

                {/* Admin Routes */}
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <PrivateRoute allowedRoles={['Admin']}>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/books/add" 
                  element={
                    <PrivateRoute allowedRoles={['Admin']}>
                      <BookForm />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/books/edit" 
                  element={
                    <PrivateRoute allowedRoles={['Admin']}>
                      <BookForm />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/books/view" 
                  element={
                    <PrivateRoute allowedRoles={['Admin']}>
                      <AdminViewBooks />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/orders" 
                  element={
                    <PrivateRoute allowedRoles={['Admin']}>
                      <OrderPlaced />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/reviews" 
                  element={
                    <PrivateRoute allowedRoles={['Admin']}>
                      <AdminViewReviews />
                    </PrivateRoute>
                  } 
                />

                {/* User Routes */}
                <Route 
                  path="/user/books" 
                  element={
                    <PrivateRoute allowedRoles={['User']}>
                      <UserViewBooks />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/user/review" 
                  element={
                    <PrivateRoute allowedRoles={['User']}>
                      <UserReview />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/user/myreviews" 
                  element={
                    <PrivateRoute allowedRoles={['User']}>
                      <UserMyReview />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/user/orders" 
                  element={
                    <PrivateRoute allowedRoles={['User']}>
                      <UserViewOrders />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/user/checkout" 
                  element={
                    <PrivateRoute allowedRoles={['User']}>
                      <Checkout />
                    </PrivateRoute>
                  } 
                />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </CartProvider>
        </ToastProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;