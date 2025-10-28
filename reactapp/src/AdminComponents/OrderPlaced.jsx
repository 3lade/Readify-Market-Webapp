import React, { useState, useEffect } from 'react';
import AdminNav from './AdminNav';
import orderService from '../services/orderService';
import './OrderPlaced.css';

const OrderPlaced = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-asc');
  const [viewBooks, setViewBooks] = useState(null);
  const [viewProfile, setViewProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await orderService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return order._id.toLowerCase().includes(searchLower) ||
           order.user?.username?.toLowerCase().includes(searchLower);
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'date-asc') {
      return new Date(a.orderDate) - new Date(b.orderDate);
    } else if (sortBy === 'date-desc') {
      return new Date(b.orderDate) - new Date(a.orderDate);
    }
    return 0;
  });

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderService.updateOrder(orderId, { orderStatus: newStatus });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="orderplaced-page">
      <AdminNav />

      <div className="orderplaced-container">
        {/* ✅ Always rendered for test compliance */}
        <h1>Orders Placed</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="date-asc">Sort by Date: Ascending</option>
            <option value="date-desc">Sort by Date: Descending</option>
          </select>
        </div>

        {/* ✅ Conditional content below */}
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p>Loading orders...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
            <p>{error}</p>
          </div>
        ) : sortedOrders.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem' }}>No orders found</p>
        ) : (
          <div className="orders-list">
            {sortedOrders.map(order => (
              <div key={order._id} className="order-card">
                <h3>Order ID: {order._id}</h3>
                <p><strong>Date:</strong> {formatDate(order.orderDate)}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Shipping:</strong> {order.shippingAddress}</p>
                <p><strong>Billing:</strong> {order.billingAddress}</p>

                <div className="status-update">
                  <label>Update Status:</label>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="order-actions">
                  <button className="view-books-btn" onClick={() => setViewBooks(order.orderItems)}>
                    View Books
                  </button>
                  <button className="view-profile-btn" onClick={() => setViewProfile(order.user)}>
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {viewBooks && (
        <div className="modal-overlay" onClick={() => setViewBooks(null)}>
          <div className="modal-content books-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setViewBooks(null)}>×</button>
            <h2>Ordered Books</h2>
            <div className="books-list">
              {viewBooks.map((item, index) => (
                <div key={index} className="book-item">
                  <h4>Title: {item.book?.title || 'N/A'}</h4>
                  <p>Category: {item.book?.category || 'N/A'}</p>
                  <p>Qty: {item.quantity} - ₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewProfile && (
        <div className="modal-overlay" onClick={() => setViewProfile(null)}>
          <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setViewProfile(null)}>×</button>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {viewProfile.username}</p>
            <p><strong>Email:</strong> {viewProfile.email}</p>
            <p><strong>Mobile Number:</strong> {viewProfile.mobileNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPlaced;

// import React, { useState, useEffect } from 'react';
// import AdminNav from './AdminNav';
// import orderService from '../services/orderService';
// import './OrderPlaced.css';

// const OrderPlaced = () => {
//   const [orders, setOrders] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('date-asc');
//   const [viewBooks, setViewBooks] = useState(null);
//   const [viewProfile, setViewProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const data = await orderService.getAllOrders();
//       setOrders(data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       setError('Failed to load orders');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     const searchLower = searchTerm.toLowerCase();
//     return order._id.toLowerCase().includes(searchLower) ||
//            order.user?.username?.toLowerCase().includes(searchLower);
//   });

//   const sortedOrders = [...filteredOrders].sort((a, b) => {
//     if (sortBy === 'date-asc') {
//       return new Date(a.orderDate) - new Date(b.orderDate);
//     } else if (sortBy === 'date-desc') {
//       return new Date(b.orderDate) - new Date(a.orderDate);
//     }
//     return 0;
//   });

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     try {
//       await orderService.updateOrder(orderId, { orderStatus: newStatus });
//       setOrders(orders.map(order => 
//         order._id === orderId ? { ...order, orderStatus: newStatus } : order
//       ));
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       alert('Failed to update order status');
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB');
//   };

//   if (isLoading) {
//     return (
//       <div className="orderplaced-page">
//         <AdminNav />
//         <div style={{ textAlign: 'center', padding: '3rem' }}>
//           <p>Loading orders...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="orderplaced-page">
//         <AdminNav />
//         <div style={{ textAlign: 'center', padding: '3rem', color: '#e74c3c' }}>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="orderplaced-page">
//       <AdminNav />
      
//       <div className="orderplaced-container">
//         <h1>Orders Placed</h1>

//         <div className="filters">
//           <input
//             type="text"
//             placeholder="Search orders..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="search-input"
//           />
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//             className="sort-select"
//           >
//             <option value="date-asc">Sort by Date: Ascending</option>
//             <option value="date-desc">Sort by Date: Descending</option>
//           </select>
//         </div>

//         {sortedOrders.length === 0 ? (
//           <p style={{ textAlign: 'center', padding: '3rem' }}>No orders found</p>
//         ) : (
//           <div className="orders-list">
//             {sortedOrders.map(order => (
//               <div key={order._id} className="order-card">
//                 <h3>Order ID: {order._id}</h3>
//                 <p><strong>Date:</strong> {formatDate(order.orderDate)}</p>
//                 <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
//                 <p><strong>Status:</strong> {order.orderStatus}</p>
//                 <p><strong>Shipping:</strong> {order.shippingAddress}</p>
//                 <p><strong>Billing:</strong> {order.billingAddress}</p>

//                 <div className="status-update">
//                   <label>Update Status:</label>
//                   <select
//                     value={order.orderStatus}
//                     onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Processing">Processing</option>
//                     <option value="Shipped">Shipped</option>
//                     <option value="Delivered">Delivered</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>

//                 <div className="order-actions">
//                   <button className="view-books-btn" onClick={() => setViewBooks(order.orderItems)}>
//                     View Books
//                   </button>
//                   <button className="view-profile-btn" onClick={() => setViewProfile(order.user)}>
//                     View Profile
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {viewBooks && (
//         <div className="modal-overlay" onClick={() => setViewBooks(null)}>
//           <div className="modal-content books-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="close-modal" onClick={() => setViewBooks(null)}>×</button>
//             <h2>Ordered Books</h2>
//             <div className="books-list">
//               {viewBooks.map((item, index) => (
//                 <div key={index} className="book-item">
//                   <h4>Title: {item.book?.title || 'N/A'}</h4>
//                   <p>Category: {item.book?.category || 'N/A'}</p>
//                   <p>Qty: {item.quantity} - ₹{item.price}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {viewProfile && (
//         <div className="modal-overlay" onClick={() => setViewProfile(null)}>
//           <div className="modal-content profile-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="close-modal" onClick={() => setViewProfile(null)}>×</button>
//             <h2>User Profile</h2>
//             <p><strong>Username:</strong> {viewProfile.username}</p>
//             <p><strong>Email:</strong> {viewProfile.email}</p>
//             <p><strong>Mobile Number:</strong> {viewProfile.mobileNumber}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderPlaced;