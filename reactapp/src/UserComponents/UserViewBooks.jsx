import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { useToasts } from 'react-toast-notifications';
import UserNav from './UserNav';
import bookService from '../services/bookService';
import reviewService from '../services/reviewService';
import './UserViewBooks.css';

const UserViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewReviews, setViewReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch } = useCart();
  const { addToast } = useToasts();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to load books');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (book, quantity) => {
    if (quantity > 0 && quantity <= book.stockQuantity) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { id: book._id, title: book.title, quantity, price: book.price }
      });
      addToast(`${book.title} added to cart!`, { appearance: 'success' });
    } else {
      addToast('Invalid quantity', { appearance: 'error' });
    }
  };

  const handleViewReviews = async (book) => {
    try {
      const reviews = await reviewService.getBookReviews(book._id);
      setViewReviews({ ...book, reviews });
    } catch (error) {
      setViewReviews({ ...book, reviews: [] });
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  if (isLoading) {
    return (
      <div className="user-view-books-page">
        <UserNav />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-view-books-page">
        <UserNav />
        <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-view-books-page">
      <UserNav />
      
      <div className="books-container">
        <h1>📚 Books</h1>

        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {filteredBooks.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem' }}>No books found</p>
        ) : (
          <div className="books-grid">
            {filteredBooks.map(book => (
              <BookCard 
                key={book._id} 
                book={book} 
                onAddToCart={handleAddToCart}
                onViewReviews={() => handleViewReviews(book)}
                onWriteReview={() => navigate('/user/review', { state: { book } })}
              />
            ))}
          </div>
        )}
      </div>

      {viewReviews && (
        <div className="modal-overlay" onClick={() => setViewReviews(null)}>
          <div className="modal-content reviews-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setViewReviews(null)}>×</button>
            <h2>Reviews for {viewReviews.title}</h2>
            {viewReviews.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <div className="reviews-list">
                {viewReviews.reviews.map((review) => (
                  <div key={review._id} className="review-item">
                    <div className="review-header">
                      <span className="username">{review.user?.username || 'Anonymous'}</span>
                      <span className="rating">{renderStars(review.rating)}</span>
                    </div>
                    <p className="review-text">{review.reviewText}</p>
                    <p className="review-date">{formatDate(review.date)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const BookCard = ({ book, onAddToCart, onViewReviews, onWriteReview }) => {
  const [quantity, setQuantity] = useState(1);

  const stockStatus = book.stockQuantity > 10 ? 'In Stock' : book.stockQuantity > 0 ? 'Limited Stock' : 'Out of Stock';
  const stockClass = book.stockQuantity > 10 ? 'in-stock' : book.stockQuantity > 0 ? 'limited-stock' : 'out-of-stock';

  return (
    <div className="book-card">
      <img src={book.coverImage} alt={book.title} />
      <h3>{book.title}</h3>
      <p className="price">₹{book.price}</p>
      <p className="author">Author: {book.author}</p>
      <p className={`stock ${stockClass}`}>{stockStatus}: {book.stockQuantity}</p>
      
      <div className="quantity-selector">
        <label>Qty:</label>
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          <option value="">Select</option>
          {[...Array(Math.min(book.stockQuantity, 10))].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <button 
        className="add-to-cart-btn"
        onClick={() => onAddToCart(book, quantity)}
        disabled={book.stockQuantity === 0}
      >
        Add to Cart
      </button>

      <div className="review-buttons">
        <button className="view-reviews-btn" onClick={onViewReviews}>View Reviews</button>
        <button className="write-review-btn" onClick={onWriteReview}>Write Review</button>
      </div>
    </div>
  );
};

export default UserViewBooks;