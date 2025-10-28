import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import readifyImage from '../assets/images/readifycover.png';
import logo from '../assets/images/logo.png';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    userRole: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'User Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    else if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.userRole) newErrors.userRole = 'Role is required';
    return newErrors;
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
      const { confirmPassword, ...userData } = formData;
      await authService.register(userData);
      setShowSuccess(true);
    } catch (error) {
      setErrors({ submit: error.message || 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="signup-page d-flex align-items-center justify-content-center">
      <div className="signup-container row g-0 bg-white rounded shadow overflow-hidden">
        
        {/* Left side image */}
        <div className="signup-left col-md-6 d-none d-md-flex">
          <img src={readifyImage} alt="Books" className="img-fluid w-100 h-100 object-fit-cover" />
        </div>

        {/* Right side form */}
        <div className="signup-right col-12 col-md-6 d-flex align-items-center justify-content-center p-4">
          <div className="signup-form-container w-100" style={{ maxWidth: '380px' }}>
            <img src={logo} alt="Logo" className="logo mb-2" />
            <h1 className="fw-bold text-dark mb-1">Readify Market</h1>
            <h2 className="text-muted mb-4 fs-6">Signup</h2>

            {errors.submit && (
              <div className="alert alert-danger py-2">{errors.submit}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Username */}
              <div className="mb-3 text-start">
                <input
                  type="text"
                  name="username"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="User Name"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>

              {/* Email */}
              <div className="mb-3 text-start">
                <input
                  type="text"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Mobile */}
              <div className="mb-3 text-start">
                <input
                  type="text"
                  name="mobileNumber"
                  className={`form-control ${errors.mobileNumber ? 'is-invalid' : ''}`}
                  placeholder="Mobile Number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.mobileNumber && <div className="invalid-feedback">{errors.mobileNumber}</div>}
              </div>

              {/* Password */}
              <div className="mb-3 text-start">
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              {/* Confirm Password */}
              <div className="mb-3 text-start">
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              {/* Role */}
              <div className="mb-3 text-start">
                <select
                  name="userRole"
                  className={`form-select ${errors.userRole ? 'is-invalid' : ''}`}
                  value={formData.userRole}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value="">Select Role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                {errors.userRole && <div className="invalid-feedback">{errors.userRole}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>

              <p className="mt-3 text-muted small">
                Already have an account? <Link to="/login" className="fw-semibold text-primary">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay" onClick={() => navigate('/login')}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">✓</div>
            <h3>User Registration Successful!</h3>
            <button className="btn btn-success fw-semibold px-4" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;