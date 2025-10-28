import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import userService from '../services/userService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBooks: 0,
    totalOrders: 0,
    totalReviews: 0
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [statsData, usersData] = await Promise.all([
        userService.getStats(),
        userService.getAllUsers()
      ]);

      setStats(statsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-page">
        <AdminNav />
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <AdminNav />
        <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <AdminNav />
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <span className="dashboard-icon">📚</span>
          <h1>Readify Market - Admin Dashboard</h1>
        </div>

        <div className="stats-grid">
          <div className="stat-card blue">
            <h3>Total Users</h3>
            <div className="stat-number">{stats.totalUsers}</div>
          </div>
          <div className="stat-card green">
            <h3>Total Books</h3>
            <div className="stat-number">{stats.totalBooks}</div>
          </div>
          <div className="stat-card orange">
            <h3>Total Orders</h3>
            <div className="stat-number">{stats.totalOrders}</div>
          </div>
          <div className="stat-card purple">
            <h3>Total Reviews</h3>
            <div className="stat-number">{stats.totalReviews}</div>
          </div>
        </div>

        <div className="users-section">
          <h2>Users List</h2>
          {users.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '2rem' }}>No users found</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;