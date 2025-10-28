import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCart } from "../CartContext";
import { clearUserInfo } from "../userSlice";
import authService from "../services/authService";
import "./UserNav.css";

const UserNav = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [showBooksDropdown, setShowBooksDropdown] = useState(false);
  const [showReviewDropdown, setShowReviewDropdown] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const booksRef = useRef(null);
  const reviewRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, dispatch: cartDispatch } = useCart();

  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (booksRef.current && !booksRef.current.contains(event.target)) {
        setShowBooksDropdown(false);
      }
      if (reviewRef.current && !reviewRef.current.contains(event.target)) {
        setShowReviewDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    dispatch(clearUserInfo());
    navigate("/login");
    setShowLogout(false);
  };

  const closeDropdowns = () => {
    setShowBooksDropdown(false);
    setShowReviewDropdown(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-info" to="/">
          Readify Market
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="userNavCollapse">
          <ul className="navbar-nav ms-auto align-items-center gap-3">
            <li className="nav-item">
              <span className="badge bg-secondary rounded-pill px-3 py-2">
                {userName} / {userRole}
              </span>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {/* Books Dropdown */}
            <li className="nav-item dropdown" ref={booksRef}>
              <span
                className="nav-link dropdown-toggle text-white"
                onClick={() => setShowBooksDropdown(!showBooksDropdown)}
                style={{ cursor: "pointer" }}
              >
                Books
              </span>
              {showBooksDropdown && (
                <ul className="dropdown-menu show shadow-sm rounded-3 mt-2 animate-dropdown">
                  <li>
                    <Link
                      className="dropdown-item py-2 px-3"
                      to="/user/books"
                      onClick={closeDropdowns}
                    >
                      View Books
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item py-2 px-3"
                      to="/user/orders"
                      onClick={closeDropdowns}
                    >
                      My Orders
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Review Dropdown */}
            <li className="nav-item dropdown" ref={reviewRef}>
              <span
                className="nav-link dropdown-toggle text-white"
                onClick={() => setShowReviewDropdown(!showReviewDropdown)}
                style={{ cursor: "pointer" }}
              >
                Review
              </span>
              {showReviewDropdown && (
                <ul className="dropdown-menu show shadow-sm rounded-3 mt-2 animate-dropdown">
                  <li>
                    <Link
                      className="dropdown-item py-2 px-3"
                      to="/user/review"
                      onClick={closeDropdowns}
                    >
                      Write Review
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item py-2 px-3"
                      to="/user/myreviews"
                      onClick={closeDropdowns}
                    >
                      My Reviews
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Cart */}
            <li className="nav-item">
              <button
                className="btn btn-outline-light position-relative"
                onClick={() => setShowCart(!showCart)}
              >
                🛒
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </button>
            </li>

            {/* Logout */}
            <li className="nav-item">
              <button
                className="btn btn-danger fw-semibold"
                onClick={() => setShowLogout(true)}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Cart Overlay */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header d-flex justify-content-between align-items-center bg-dark text-white p-3">
              <h5 className="mb-0">Your Cart</h5>
              <button
                className="btn-close btn-close-white"
                onClick={() => setShowCart(false)}
              ></button>
            </div>
            <div className="panel-body p-3">
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="mb-3 border-bottom pb-2">
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">Qty: {item.quantity}</small>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="panel-footer d-flex gap-2 p-3 border-top">
                <button
                  className="btn btn-outline-danger flex-fill"
                  onClick={() => cartDispatch({ type: "CLEAR_CART" })}
                >
                  Clear
                </button>
                <button
                  className="btn btn-success flex-fill"
                  onClick={() => {
                    setShowCart(false);
                    navigate("/user/checkout");
                  }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Logout Modal */}
      {showLogout && (
        <div className="modal-overlay" onClick={() => setShowLogout(false)}>
          <div
            className="simple-logout-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title">Confirm Logout</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowLogout(false)}
              ></button>
            </div>
            <div className="modal-body pt-3 pb-4">
              <p className="mb-0">Are you sure you want to logout?</p>
            </div>
            <div className="modal-footer border-0 d-flex justify-content-end gap-2 pt-0">
              <button className="btn btn-danger px-4" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button
                className="btn btn-secondary px-4"
                onClick={() => setShowLogout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default UserNav;
