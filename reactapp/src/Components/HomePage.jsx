import React from 'react';
import AdminNav from '../AdminComponents/AdminNav';
import UserNav from '../UserComponents/UserNav';
import './HomePage.css';
import readifyCover from '../assets/images/readifycover.png';

const HomePage = () => {
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="homepage">
      {userRole === 'Admin' ? <AdminNav /> : <UserNav />}

      {/* Hero Section */}
      <div className="hero-section position-relative text-center">
        <img src={readifyCover} alt="Readify Market" className="hero-image" />
        <h1 className="hero-title display-3 fw-bold">Readify Market</h1>
      </div>

      {/* Welcome Section */}
      <div className="welcome-section container text-center">
        <p className="welcome-text lead">
          Welcome to <strong>Readify Market</strong>, your one-stop destination for premium books across genres. 
          Explore a wide range of Fiction, Non-fiction, Science, Comics, Romance, Thriller, Fantasy, and Children's books. 
          Whether you're a casual reader or a book enthusiast, find your next favorite read here. 
          Start exploring today and enrich your reading journey!
        </p>
      </div>

      {/* Contact Section */}
      <div className="contact-section mx-auto">
        <h2 className="fw-bold">Contact Us</h2>
        <div className="contact-details">
          <p><i className="bi bi-telephone-fill me-2 text-primary"></i><strong>Phone:</strong> +91 98765 43210</p>
          <p><i className="bi bi-envelope-fill me-2 text-danger"></i><strong>Email:</strong> support@readifymarket.com</p>
          <p><i className="bi bi-geo-alt-fill me-2 text-success"></i><strong>Address:</strong> 123 Book Lane, Literature City, IN</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;