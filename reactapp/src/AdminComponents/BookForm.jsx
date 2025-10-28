import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminNav from './AdminNav';
import bookService from '../services/bookService';
import './BookForm.css';

const BookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editBook = location.state?.book;
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    stockQuantity: '',
    category: '',
    description: '',
    coverImage: ''
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editBook) {
      setFormData({
        title: editBook.title || '',
        author: editBook.author || '',
        price: editBook.price || '',
        stockQuantity: editBook.stockQuantity || '',
        category: editBook.category || '',
        description: editBook.description || '',
        coverImage: editBook.coverImage || ''
      });
      setImagePreview(editBook.coverImage);
    }
  }, [editBook]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Book title is required';
    if (!formData.author) newErrors.author = 'Author is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.stockQuantity) newErrors.stockQuantity = 'Stock Quantity is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.coverImage && !imagePreview) newErrors.coverImage = 'Cover Image is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Image compression function
  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression
          canvas.toBlob(
            (blob) => {
              const compressedReader = new FileReader();
              compressedReader.readAsDataURL(blob);
              compressedReader.onloadend = () => {
                resolve(compressedReader.result);
              };
            },
            'image/jpeg',
            quality
          );
        };
        
        img.onerror = reject;
      };
      
      reader.onerror = reject;
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (warn if > 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ 
          ...errors, 
          coverImage: 'Image is too large. It will be compressed automatically.' 
        });
      }

      try {
        setIsLoading(true);
        const compressedImage = await compressImage(file);
        setImagePreview(compressedImage);
        setFormData({ ...formData, coverImage: compressedImage });
        
        // Clear error after successful compression
        if (errors.coverImage) {
          setErrors({ ...errors, coverImage: '' });
        }
      } catch (error) {
        setErrors({ 
          ...errors, 
          coverImage: 'Failed to process image. Please try another image.' 
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Convert price and stockQuantity to numbers
      const bookData = {
        ...formData,
        price: Number(formData.price),
        stockQuantity: Number(formData.stockQuantity)
      };

      if (editBook) {
        await bookService.updateBook(editBook._id, bookData);
      } else {
        await bookService.addBook(bookData);
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/admin/books/view');
      }, 2000);
    } catch (error) {
      setErrors({ 
        submit: error.message || 'Failed to save book. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bookform-page">
      <AdminNav />
      <div className="bookform-container">
        <h1>{editBook ? 'Edit Book' : 'Add New Book'}</h1>
        
        {errors.submit && (
          <div style={{ color: '#e74c3c', marginBottom: '1rem', textAlign: 'center' }}>
            {errors.submit}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.author && <span className="error">{errors.author}</span>}
          </div>

          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label>Stock Quantity *</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.stockQuantity && <span className="error">{errors.stockQuantity}</span>}
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="">Select Category</option>
              <option value="Fiction">Fiction</option>
              <option value="Science">Science</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Comics">Comics</option>
            </select>
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label>Cover Image *</label>
            <div className="image-input-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading}
                className="file-input"
              />
              <span className="file-hint">or</span>
              <input
                type="text"
                name="coverImage"
                placeholder="Enter image URL"
                value={formData.coverImage}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>
            {errors.coverImage && <span className="error">{errors.coverImage}</span>}
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Processing...' : (editBook ? 'Update Book' : 'Add Book')}
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="success-modal-overlay">
          <div className="success-modal-content">
            <div className="success-icon">✓</div>
            <h3>Success!</h3>
            <p>Book {editBook ? 'Updated' : 'Added'} Successfully!</p>
            <button onClick={() => setShowSuccess(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookForm;