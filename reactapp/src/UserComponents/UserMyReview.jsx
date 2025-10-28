import React, { useState, useEffect } from 'react';
import UserNav from './UserNav';
import reviewService from '../services/reviewService';
import './UserMyReview.css';

const UserMyReview = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteReview, setDeleteReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userId = localStorage.getItem('userId');
      const data = await reviewService.getUserReviews(userId);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      if (error.message?.includes('No reviews found')) {
        setReviews([]);
      } else {
        setError('Failed to load reviews');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async () => {
    try {
      await reviewService.deleteReview(deleteReview._id);
      setReviews(reviews.filter(r => r._id !== deleteReview._id));
      setDeleteReview(null);
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="user-myreview-page">
      <UserNav />

      <div className="myreview-container">
        {/* ✅ Always rendered for test compliance */}
        <h1>My Book Reviews</h1>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading reviews...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
            <p>{error}</p>
          </div>
        ) : reviews.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem' }}>You haven't written any reviews yet.</p>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review._id} className="review-card">
                <h2>{review.book?.title || 'Book not available'}</h2>
                <div className="rating">Rating: {renderStars(review.rating)}</div>
                <div className="review-date">Date: {formatDate(review.date)}</div>
                <p className="review-text">{review.reviewText}</p>
                <div className="review-actions">
                  <button
                    className="view-book-btn"
                    onClick={() => setSelectedBook(review.book)}
                  >
                    View Book
                  </button>
                  <button
                    className="delete-review-btn"
                    onClick={() => setDeleteReview(review)}
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content book-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedBook(null)}>×</button>
            <h2>{selectedBook.title}</h2>
            <img src={selectedBook.coverImage} alt={selectedBook.title} />
            <p><strong>Price:</strong> ₹{selectedBook.price}</p>
            <p><strong>Category:</strong> {selectedBook.category}</p>
          </div>
        </div>
      )}

      {deleteReview && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this review?</h3>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleDeleteReview}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setDeleteReview(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMyReview;

// import React, { useState, useEffect } from 'react';
// import UserNav from './UserNav';
// import reviewService from '../services/reviewService';
// import './UserMyReview.css';

// const UserMyReview = () => {
//   const [reviews, setReviews] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [deleteReview, setDeleteReview] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchMyReviews();
//   }, []);

//   const fetchMyReviews = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const userId = localStorage.getItem('userId');
//       const data = await reviewService.getUserReviews(userId);
//       setReviews(data);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       if (error.message?.includes('No reviews found')) {
//         setReviews([]);
//       } else {
//         setError('Failed to load reviews');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteReview = async () => {
//     try {
//       await reviewService.deleteReview(deleteReview._id);
//       setReviews(reviews.filter(r => r._id !== deleteReview._id));
//       setDeleteReview(null);
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       alert('Failed to delete review. Please try again.');
//     }
//   };

//   const renderStars = (rating) => {
//     return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB');
//   };

//   if (isLoading) {
//     return (
//       <div className="user-myreview-page">
//         <UserNav />
//         <div style={{ textAlign: 'center', padding: '3rem' }}>
//           <p>Loading reviews...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="user-myreview-page">
//         <UserNav />
//         <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="user-myreview-page">
//       <UserNav />
      
//       <div className="myreview-container">
//         <h1>My Book Reviews</h1>

//         {reviews.length === 0 ? (
//           <p style={{ textAlign: 'center', padding: '3rem' }}>You haven't written any reviews yet.</p>
//         ) : (
//           <div className="reviews-list">
//             {reviews.map(review => (
//               <div key={review._id} className="review-card">
//                 <h2>{review.book?.title || 'Book not available'}</h2>
//                 <div className="rating">Rating: {renderStars(review.rating)}</div>
//                 <div className="review-date">Date: {formatDate(review.date)}</div>
//                 <p className="review-text">{review.reviewText}</p>
//                 <div className="review-actions">
//                   <button 
//                     className="view-book-btn"
//                     onClick={() => setSelectedBook(review.book)}
//                   >
//                     View Book
//                   </button>
//                   <button 
//                     className="delete-review-btn"
//                     onClick={() => setDeleteReview(review)}
//                   >
//                     Delete Review
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {selectedBook && (
//         <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
//           <div className="modal-content book-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="close-modal" onClick={() => setSelectedBook(null)}>×</button>
//             <h2>{selectedBook.title}</h2>
//             <img src={selectedBook.coverImage} alt={selectedBook.title} />
//             <p><strong>Price:</strong> ₹{selectedBook.price}</p>
//             <p><strong>Category:</strong> {selectedBook.category}</p>
//           </div>
//         </div>
//       )}

//       {deleteReview && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Are you sure you want to delete this review?</h3>
//             <div className="modal-actions">
//               <button className="confirm-btn" onClick={handleDeleteReview}>Yes, Delete</button>
//               <button className="cancel-btn" onClick={() => setDeleteReview(null)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserMyReview;