import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserNav from './UserNav';
import bookService from '../services/bookService';
import reviewService from '../services/reviewService';
import './UserReview.css';

const UserReview = () => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedBook, setSelectedBook] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedBook = location.state?.book;

  useEffect(() => {
    fetchBooks();
    if (preSelectedBook) {
      setSelectedBook(preSelectedBook._id);
    }
  }, [preSelectedBook]);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const emojis = ['😠', '😞', '😐', '😊', '😍'];
  const emojiValues = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewText || rating === 0) {
      setError('Please provide both review text and rating');
      return;
    }

    if (!selectedBook) {
      setError('Please select a book');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('userId');
      
      await reviewService.addReview({
        userId,
        bookId: selectedBook,
        rating,
        comment: reviewText
      });

      alert('Review submitted successfully!');
      setReviewText('');
      setRating(0);
      setSelectedBook('');
      navigate('/user/books');
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-review-page">
      <UserNav />
      
      <div className="review-container">
        <h1>📚 Share Your Thoughts</h1>
        
        {error && (
          <div style={{ color: '#e74c3c', marginBottom: '1rem', textAlign: 'center' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Select Book *
            </label>
            <select
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
              disabled={isLoading || preSelectedBook}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '1rem'
              }}
            >
              <option value="">Choose a book</option>
              {books.map(book => (
                <option key={book._id} value={book._id}>
                  {book.title} by {book.author}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <textarea
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="8"
              disabled={isLoading}
            />
          </div>

          <div className="rating-section">
            {emojis.map((emoji, index) => (
              <span
                key={index}
                className={`emoji ${rating === emojiValues[index] ? 'selected' : ''}`}
                onClick={() => !isLoading && setRating(emojiValues[index])}
              >
                {emoji}
              </span>
            ))}
          </div>

          <button type="submit" className="submit-review-btn" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserReview;