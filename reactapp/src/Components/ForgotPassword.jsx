import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ForgotPassword.css';
import image from '../assets/images/forgotPassword.png';
import logo from '../assets/images/logo.png';
import api from '../services/api'; // your axios wrapper

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const validateEmail = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    return newErrors;
  };

  const validatePasswords = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleVerify = () => {
    const validationErrors = validateEmail();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleResetPassword = async () => {
    const validationErrors = validatePasswords();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await api.post('/users/reset-password', {
        email: formData.email,
        newPassword: formData.newPassword
      });

      alert(response.data.message || 'Password reset successful! You can now log in.');
      window.location.href = '/login';
    } catch (err) {
      setErrors({ confirmPassword: err.response?.data?.message || 'Server error, please try again later' });
    }
  };

  return (
    <div className="forgot-password-page d-flex align-items-center justify-content-center min-vh-100">
      <div className="row w-100">
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <img src={image} alt="Forgot Password" className="img-fluid" />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center p-4">
          <div className="forgot-form-container bg-white p-4 rounded shadow text-center w-100" style={{ maxWidth: '400px' }}>
            <img src={logo} alt="Logo" className="logo mb-3" />
            <h1 className="h4 text-dark mb-2">Forgot Password</h1>
            <p className="text-muted mb-4">Enter your email to reset your password.</p>

            <div className="form-group mb-3 text-start">
              <label className="form-label">Email *</label>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={step === 2}
                />
                {step === 1 && (
                  <button className="btn btn-info text-white" onClick={handleVerify}>Verify</button>
                )}
              </div>
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            {step === 2 && (
              <>
                <div className="form-group mb-3 text-start">
                  <label className="form-label">New Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter new password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  />
                  {errors.newPassword && <small className="text-danger">{errors.newPassword}</small>}
                </div>

                <div className="form-group mb-3 text-start">
                  <label className="form-label">Confirm New Password *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Re-enter new password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                </div>

                <button className="btn btn-success w-100" onClick={handleResetPassword}>
                  Reset Password
                </button>
              </>
            )}

            <p className="login-link mt-3 text-muted">
              Remembered your password?{' '}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;