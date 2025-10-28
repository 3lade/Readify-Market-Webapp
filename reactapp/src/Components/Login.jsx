import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../userSlice';
import authService from '../services/authService';
import logo from '../assets/images/logo.png';
import readifyImage from '../assets/images/readifycover.png';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    if (formData.email && !/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

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
      const response = await authService.login(formData.email, formData.password);

      dispatch(setUserInfo({
        userId: response.user.id,
        userName: response.user.username,
        role: response.user.userRole
      }));

      navigate('/');
    } catch (error) {
      setErrors({
        submit: error.message || 'Login failed. Please check your credentials.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center">
      <div className="login-container row g-0 shadow rounded overflow-hidden bg-white">
        
        {/* Left side image */}
        <div className="login-left col-md-6 d-none d-md-flex">
          <img src={readifyImage} alt="Books" className="img-fluid w-100 h-100 object-fit-cover" />
        </div>

        {/* Right side form */}
        <div className="login-right col-12 col-md-6 d-flex align-items-center justify-content-center p-4">
          <div className="login-form-container w-100" style={{ maxWidth: '400px' }}>
            <img src={logo} alt="Logo" className="logo mb-3" />
            <h1 className="fw-bold text-dark mb-1">Readify Market</h1>
            <h2 className="text-muted mb-4 fs-5">Login</h2>

            {errors.submit && (
              <div className="alert alert-danger py-2">{errors.submit}</div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-3 text-start">
                <input
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Password with Bootstrap input-group */}
              <div className="mb-3 text-start">
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? '🙈' : '👁'}
                  </button>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>

              <div className="d-flex justify-content-end mb-3">
                <Link to="/forgot-password" className="text-decoration-none small text-primary">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              <p className="signup-text mt-3 text-muted small">
                Don't have an account? <Link to="/signup" className="fw-semibold text-primary">Signup</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;