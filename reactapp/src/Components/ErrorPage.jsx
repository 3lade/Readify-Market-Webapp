import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <img src="/assets/images/alert.png" alt="Error" className="error-icon" />
      <h1>Oops! Something Went Wrong</h1>
      <p>Please try again later.</p>
      <Link to="/" className="home-btn">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;