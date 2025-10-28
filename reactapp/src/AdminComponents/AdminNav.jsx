import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserInfo } from '../userSlice';
import authService from '../services/authService';
import './AdminNav.css';

const AdminNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [showBooksDropdown, setShowBooksDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowBooksDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    dispatch(clearUserInfo());
    navigate('/login');
    setShowLogout(false);
  };

  const toggleBooksDropdown = () => {
    setShowBooksDropdown(!showBooksDropdown);
  };

  const handleDropdownLinkClick = () => {
    setShowBooksDropdown(false);
  };

  return (
    <nav className="navbar navbar-expand-lg admin-nav shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-info" to="/">Readify Market</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavCollapse">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <span className="badge bg-secondary rounded-pill px-3 py-2">
                {userName} / {userRole}
              </span>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/dashboard">Dashboard</Link>
            </li>

            {/* Books Dropdown */}
            <li className="nav-item dropdown" ref={dropdownRef}>
              <span
                className={`nav-link dropdown-toggle text-white ${showBooksDropdown ? 'active' : ''}`}
                onClick={toggleBooksDropdown}
                style={{ cursor: 'pointer' }}
              >
                Books
              </span>
              {showBooksDropdown && (
                <ul className="dropdown-menu show shadow-sm rounded-3 mt-2 animate-dropdown">
                  <li>
                    <Link
                      className="dropdown-item py-2 px-3 d-flex align-items-center"
                      to="/admin/books/add"
                      onClick={handleDropdownLinkClick}
                    >
                      <i className="bi bi-plus-circle me-2 text-primary"></i> Add Book
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item py-2 px-3 d-flex align-items-center"
                      to="/admin/books/view"
                      onClick={handleDropdownLinkClick}
                    >
                      <i className="bi bi-book me-2 text-success"></i> View Books
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/orders">Orders</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/admin/reviews">Reviews</Link>
            </li>

            <li className="nav-item">
              <button className="btn btn-danger fw-semibold" onClick={() => setShowLogout(true)}>
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogout && (
        <div className="modal-overlay" onClick={() => setShowLogout(false)}>
          <div className="simple-logout-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title">Confirm Logout</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowLogout(false)}
              ></button>
            </div>
            <div className="modal-body pt-3 pb-4">
              <p className="mb-0">Are you sure you want to log out of your admin account?</p>
            </div>
            <div className="modal-footer border-0 d-flex justify-content-end gap-2 pt-0">
              <button className="btn btn-danger px-4" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Yes, Logout
              </button>
              <button className="btn btn-secondary px-4" onClick={() => setShowLogout(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNav;