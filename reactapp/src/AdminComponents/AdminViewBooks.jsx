import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';
import bookService from '../services/bookService';
import './AdminViewBooks.css';

const AdminViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [deleteBook, setDeleteBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || book.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (book) => {
    navigate('/admin/books/edit', { state: { book } });
  };

  const handleDelete = async () => {
    try {
      await bookService.deleteBook(deleteBook._id);
      setBooks(books.filter(b => b._id !== deleteBook._id));
      setDeleteBook(null);
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Failed to delete book. Please try again.');
    }
  };

  return (
    <div className="admin-view-books-page">
      <AdminNav />

      <div className="admin-books-container">
        {/* ✅ Always rendered for test compliance */}
        <h1>📚 Manage Books</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="category-filter"
          >
            <option value="All">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Thriller">Thriller</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Comics">Comics</option>
          </select>
        </div>

        {/* ✅ Conditional content below */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading books...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
            <p>{error}</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem' }}>No books found</p>
        ) : (
          <div className="books-grid">
            {filteredBooks.map(book => (
              <div key={book._id} className="book-card">
                <img src={book.coverImage} alt={book.title} />
                <h3>{book.title}</h3>
                <p className="author">By {book.author}</p>
                <p className="price">₹{book.price}</p>
                <p className="stock">Stock: {book.stockQuantity}</p>
                <p className="category">Category: {book.category}</p>
                <div className="card-actions">
                  <button className="edit-btn" onClick={() => handleEdit(book)}>Edit</button>
                  <button className="delete-btn" onClick={() => setDeleteBook(book)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteBook && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this book?</h3>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setDeleteBook(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewBooks;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AdminNav from './AdminNav';
// import bookService from '../services/bookService';
// import './AdminViewBooks.css';

// const AdminViewBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [deleteBook, setDeleteBook] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await bookService.getAllBooks();
//       setBooks(data);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//       setError('Failed to load books');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredBooks = books.filter(book => {
//     const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = categoryFilter === 'All' || book.category === categoryFilter;
//     return matchesSearch && matchesCategory;
//   });

//   const handleEdit = (book) => {
//     navigate('/admin/books/edit', { state: { book } });
//   };

//   const handleDelete = async () => {
//     try {
//       await bookService.deleteBook(deleteBook._id);
//       setBooks(books.filter(b => b._id !== deleteBook._id));
//       setDeleteBook(null);
//     } catch (error) {
//       console.error('Error deleting book:', error);
//       alert('Failed to delete book. Please try again.');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="admin-view-books-page">
//         <AdminNav />
//         <div style={{ textAlign: 'center', padding: '3rem' }}>
//           <p>Loading books...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="admin-view-books-page">
//         <AdminNav />
//         <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-view-books-page">
//       <AdminNav />
      
//       <div className="admin-books-container">
//         <h1>📚 Manage Books</h1>

//         <div className="filters">
//           <input
//             type="text"
//             placeholder="Search books..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="category-filter"
//           >
//             <option value="All">All Categories</option>
//             <option value="Fiction">Fiction</option>
//             <option value="Science">Science</option>
//             <option value="Thriller">Thriller</option>
//             <option value="Romance">Romance</option>
//             <option value="Fantasy">Fantasy</option>
//             <option value="Comics">Comics</option>
//           </select>
//         </div>

//         {filteredBooks.length === 0 ? (
//           <p style={{ textAlign: 'center', padding: '3rem' }}>No books found</p>
//         ) : (
//           <div className="books-grid">
//             {filteredBooks.map(book => (
//               <div key={book._id} className="book-card">
//                 <img src={book.coverImage} alt={book.title} />
//                 <h3>{book.title}</h3>
//                 <p className="author">By {book.author}</p>
//                 <p className="price">₹{book.price}</p>
//                 <p className="stock">Stock: {book.stockQuantity}</p>
//                 <p className="category">Category: {book.category}</p>
//                 <div className="card-actions">
//                   <button className="edit-btn" onClick={() => handleEdit(book)}>Edit</button>
//                   <button className="delete-btn" onClick={() => setDeleteBook(book)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {deleteBook && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <h3>Are you sure you want to delete this book?</h3>
//             <div className="modal-actions">
//               <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
//               <button className="cancel-btn" onClick={() => setDeleteBook(null)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminViewBooks;