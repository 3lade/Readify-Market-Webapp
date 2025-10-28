import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import reviewService from '../services/reviewService';
import './AdminViewReviews.css';

const AdminViewReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-asc');
  const [viewBook, setViewBook] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await reviewService.getAllReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReviews = reviews.filter(review => {
    const searchLower = searchTerm.toLowerCase();
    return review.book?.title?.toLowerCase().includes(searchLower) ||
           review.user?.username?.toLowerCase().includes(searchLower);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'date-asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'date-desc') {
      return new Date(b.date) - new Date(a.date);
    }
    return 0;
  });

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="admin-view-reviews-page">
      <AdminNav />

      <div className="admin-reviews-container">
        {/* ✅ Always rendered for test compliance */}
        <h1>View Reviews</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search Reviews"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date-asc">Sort by Date: Ascending</option>
            <option value="date-desc">Sort by Date: Descending</option>
          </select>
        </div>

        {/* ✅ Conditional content below */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading reviews...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
            <p>{error}</p>
          </div>
        ) : sortedReviews.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem' }}>No reviews found</p>
        ) : (
          <div className="reviews-list">
            {sortedReviews.map(review => (
              <div key={review._id} className="review-card">
                <h2>{review.book?.title || 'Book not available'}</h2>
                <div className="rating">{renderStars(review.rating)}</div>
                <div className="review-date">Date: {formatDate(review.date)}</div>
                <p className="review-text">{review.reviewText}</p>
                <div className="review-actions">
                  <button className="view-book-btn" onClick={() => setViewBook(review.book)}>
                    View Book
                  </button>
                  <button className="view-user-btn" onClick={() => setViewUser(review.user)}>
                    View User
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewBook && (
        <div className="modal-overlay" onClick={() => setViewBook(null)}>
          <div className="modal-content book-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setViewBook(null)}>×</button>
            <h2>Book Details</h2>
            <img src={viewBook.coverImage} alt={viewBook.title} />
            <p><strong>Title:</strong> {viewBook.title}</p>
            <p><strong>Author:</strong> {viewBook.author}</p>
            <p><strong>Price:</strong> ₹{viewBook.price}</p>
            <p><strong>Category:</strong> {viewBook.category}</p>
          </div>
        </div>
      )}

      {viewUser && (
        <div className="modal-overlay" onClick={() => setViewUser(null)}>
          <div className="modal-content user-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setViewUser(null)}>×</button>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {viewUser.username}</p>
            <p><strong>Email:</strong> {viewUser.email}</p>
            <p><strong>Mobile Number:</strong> {viewUser.mobileNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewReviews;

// import React, { useState, useEffect } from 'react';
// import AdminNav from './AdminNav';
// import reviewService from '../services/reviewService';
// import './AdminViewReviews.css';

// const AdminViewReviews = () => {
//   const [reviews, setReviews] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('date-asc');
//   const [viewBook, setViewBook] = useState(null);
//   const [viewUser, setViewUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await reviewService.getAllReviews();
//       setReviews(data);
//     } catch (error) {
//       console.error('Error fetching reviews:', error);
//       setError('Failed to load reviews');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredReviews = reviews.filter(review => {
//     const searchLower = searchTerm.toLowerCase();
//     return review.book?.title?.toLowerCase().includes(searchLower) ||
//            review.user?.username?.toLowerCase().includes(searchLower);
//   });

//   const sortedReviews = [...filteredReviews].sort((a, b) => {
//     if (sortBy === 'date-asc') {
//       return new Date(a.date) - new Date(b.date);
//     } else if (sortBy === 'date-desc') {
//       return new Date(b.date) - new Date(a.date);
//     }
//     return 0;
//   });

//   const renderStars = (rating) => {
//     return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB');
//   };

//   if (isLoading) {
//     return (
//       <div className="admin-view-reviews-page">
//         <AdminNav />
//         <div style={{ textAlign: 'center', padding: '3rem' }}>
//           <p>Loading reviews...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="admin-view-reviews-page">
//         <AdminNav />
//         <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-view-reviews-page">
//       <AdminNav />
      
//       <div className="admin-reviews-container">
//         <h1>View Reviews</h1>

//         <div className="filters">
//           <input
//             type="text"
//             placeholder="Search Reviews"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="sort-select"
//           >
//             <option value="date-asc">Sort by Date: Ascending</option>
//             <option value="date-desc">Sort by Date: Descending</option>
//           </select>
//         </div>

//         {sortedReviews.length === 0 ? (
//           <p style={{ textAlign: 'center', padding: '3rem' }}>No reviews found</p>
//         ) : (
//           <div className="reviews-list">
//             {sortedReviews.map(review => (
//               <div key={review._id} className="review-card">
//                 <h2>{review.book?.title || 'Book not available'}</h2>
//                 <div className="rating">{renderStars(review.rating)}</div>
//                 <div className="review-date">Date: {formatDate(review.date)}</div>
//                 <p className="review-text">{review.reviewText}</p>
//                 <div className="review-actions">
//                   <button className="view-book-btn" onClick={() => setViewBook(review.book)}>
//                     View Book
//                   </button>
//                   <button className="view-user-btn" onClick={() => setViewUser(review.user)}>
//                     View User
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {viewBook && (
//         <div className="modal-overlay" onClick={() => setViewBook(null)}>
//           <div className="modal-content book-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="close-modal" onClick={() => setViewBook(null)}>×</button>
//             <h2>Book Details</h2>
//             <img src={viewBook.coverImage} alt={viewBook.title} />
//             <p><strong>Title:</strong> {viewBook.title}</p>
//             <p><strong>Author:</strong> {viewBook.author}</p>
//             <p><strong>Price:</strong> ₹{viewBook.price}</p>
//             <p><strong>Category:</strong> {viewBook.category}</p>
//           </div>
//         </div>
//       )}

//       {viewUser && (
//         <div className="modal-overlay" onClick={() => setViewUser(null)}>
//           <div className="modal-content user-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="close-modal" onClick={() => setViewUser(null)}>×</button>
//             <h2>User Profile</h2>
//             <p><strong>Username:</strong> {viewUser.username}</p>
//             <p><strong>Email:</strong> {viewUser.email}</p>
//             <p><strong>Mobile Number:</strong> {viewUser.mobileNumber}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminViewReviews;