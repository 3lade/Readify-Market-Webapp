import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import UserNav from './UserNav';
import orderService from '../services/orderService';
import './Checkout.css';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const [formData, setFormData] = useState({
    shippingAddress: '',
    billingAddress: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.shippingAddress || !formData.billingAddress) {
      setError('Please fill in both addresses');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('userId');
      
      // Prepare order items in the format backend expects
      const orderItems = cart.map(item => ({
        bookId: item.id,
        quantity: item.quantity
      }));

      const orderData = {
        user: userId,
        orderItems,
        shippingAddress: formData.shippingAddress,
        billingAddress: formData.billingAddress
      };

      await orderService.createOrder(orderData);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueShopping = () => {
    dispatch({ type: 'CLEAR_CART' });
    setShowSuccess(false);
    navigate('/user/books');
  };

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="checkout-page">
        <UserNav />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Your cart is empty</h2>
          <button 
            onClick={() => navigate('/user/books')}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <UserNav />

      <div className="checkout-container">
        <h1>Order Confirmation</h1>

        <div className="invoice-section">
          <h2>Invoice</h2>
          {cart.map((item, index) => (
            <div key={index} className="invoice-item">
              <h3>{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
              <p>Subtotal: ₹{item.price * item.quantity}</p>
            </div>
          ))}
          <div className="total">
            <strong>Total Amount: ₹{totalAmount}</strong>
          </div>
        </div>

        {error && (
          <div style={{ 
            color: '#e74c3c', 
            marginBottom: '1rem', 
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: '#ffe5e5',
            borderRadius: '5px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="shipping-section">
            <h2>Enter Shipping Details</h2>
            <div className="form-group">
              <label>Shipping Address:</label>
              <input
                type="text"
                placeholder="Enter shipping address"
                value={formData.shippingAddress}
                onChange={(e) =>
                  setFormData({ ...formData, shippingAddress: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>Billing Address:</label>
              <input
                type="text"
                placeholder="Enter billing address"
                value={formData.billingAddress}
                onChange={(e) =>
                  setFormData({ ...formData, billingAddress: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
          </div>

          <button type="submit" className="place-order-btn" disabled={isLoading}>
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        {showSuccess && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>🎉 Order placed successfully!</h3>
              <button onClick={handleContinueShopping}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;