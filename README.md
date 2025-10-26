# 📚 BookStore E-Commerce Platform

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> A full-stack e-commerce platform for book lovers with separate interfaces for users and administrators, built with MERN stack.

## 🌟 Features

### 👤 User Features
- **Authentication & Authorization**
  - Secure login and signup system
  - Password recovery functionality
  - Protected routes for authenticated users
  
- **Book Management**
  - Browse extensive book catalog
  - View detailed book information
  - Search and filter capabilities
  
- **Shopping Experience**
  - Shopping cart functionality with CartContext
  - Secure checkout process
  - Order history tracking
  
- **Review System**
  - Write and manage book reviews
  - View other users' reviews
  - Rate books

### 👑 Admin Features
- **Dashboard**
  - Comprehensive admin dashboard
  - Real-time statistics and metrics
  
- **Inventory Management**
  - Add/Edit/Remove books
  - Manage book details and stock
  
- **Order Management**
  - View and process orders
  - Track order status
  
- **Review Management**
  - Moderate user reviews
  - Remove inappropriate content

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI development
- **Redux Toolkit** - State management
- **React Router** - Navigation and routing
- **Axios** - API integration
- **CSS Modules** - Styled components
- **Jest & React Testing Library** - Testing framework

### Backend (nodeapp)
- **Node.js & Express.js** - RESTful API server
- **MongoDB & Mongoose** - Database integration with schemas
- **JWT & Bcrypt** - Secure authentication system
- **Express Validator** - Request validation
- **Swagger** - API documentation
- **Jest & Supertest** - API testing
- **CORS** - Cross-origin resource sharing
- **File System Integration** - JSON file-based data handling

#### API Features
- **User Management**
  - Authentication (Login/Register)
  - JWT token-based authorization
  - Password hashing with Bcrypt
  - Role-based access (Admin/User)

- **Book Management**
  - CRUD operations for books
  - Search and filter capabilities
  - Stock management
  - Category organization

- **Order System**
  - Order creation and tracking
  - Order history
  - Status management
  - Purchase validation

- **Review System**
  - Book reviews and ratings
  - User review management
  - Review moderation
  - Rating analytics

- **Data Persistence**
  - MongoDB database integration
  - JSON file backup system
  - Data validation middleware
  - Error handling

### DevOps & Tools
- **Git** - Version control
- **SonarQube** - Code quality
- **Jest** - Testing framework
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **PM2** - Process manager

## 📦 Project Structure
```
project/
├── reactapp/                    # Frontend application
│   ├── src/
│   │   ├── AdminComponents/     # Admin interface
│   │   ├── UserComponents/      # User interface
│   │   ├── Components/          # Shared components
│   │   ├── services/           # API services
│   │   └── tests/              # Frontend tests
│   └── public/                 # Static files
├── nodeapp/                    # Backend API server
│   ├── controllers/           # Request handlers
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── tests/               # API tests
│   ├── booksData.json       # Books data backup
│   ├── userData.json        # User data backup
│   └── index.js            # Server entry point
└── react/                    # Development scripts
    └── tests/               # Additional tests
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Setup Frontend**
   ```bash
   cd reactapp
   npm install
   ```

3. **Setup Backend**
   ```bash
   cd ../nodeapp
   npm install
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Frontend
   cd reactapp
   npm start

   # Terminal 2 - Backend
   cd ../nodeapp
   npm start
   ```

## 🔒 Environment Variables & Configuration

### Frontend Configuration
```env
REACT_APP_API_URL=http://localhost:8080
REACT_APP_NODE_ENV=development
PORT=8081
```

### Backend Configuration
```env
NODE_ENV=development
PORT=8080
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:8081
```

### API Endpoints

#### Authentication
```
POST /api/users/register - User registration
POST /api/users/login - User login
GET /api/users/profile - Get user profile
PUT /api/users/profile - Update user profile
```

#### Books
```
GET /api/books - Get all books
GET /api/books/:id - Get book by ID
POST /api/books - Add new book (Admin)
PUT /api/books/:id - Update book (Admin)
DELETE /api/books/:id - Delete book (Admin)
```

#### Orders
```
POST /api/orders - Create new order
GET /api/orders - Get user orders
GET /api/orders/:id - Get order details
PUT /api/orders/:id - Update order status (Admin)
```

#### Reviews
```
POST /api/reviews - Add book review
GET /api/reviews/book/:id - Get book reviews
PUT /api/reviews/:id - Update review
DELETE /api/reviews/:id - Delete review
```

## 🧪 Testing
- Unit tests using Jest
- Component testing with React Testing Library
- Mock implementations for API calls

## 📱 Responsive Design
- Mobile-first approach
- Tablet & desktop optimized
- Accessible on all devices

## 🔐 Security Features
- JWT Authentication
- Protected API endpoints
- Secure password handling
- XSS protection
- CSRF protection

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support
For support, email support@bookstore.com or join our Slack channel.

---

<div align="center">
Made with ❤️ by 3lade
</div>
