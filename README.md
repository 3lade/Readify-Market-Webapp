# Readify-Market-Webapp


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

### Backend
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication mechanism
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service integration
- **Express Validator** - Input validation

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
├── reactapp/                  # Frontend application
│   ├── src/
│   │   ├── AdminComponents/   # Admin interface
│   │   ├── UserComponents/    # User interface
│   │   ├── Components/        # Shared components
│   │   ├── services/         # API services
│   │   └── tests/            # Frontend tests
│   └── public/               # Static files
├── appdb/                    # Backend database
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Business logic
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── config/             # Configuration files
└── react/                   # Development scripts
    └── tests/              # Backend tests
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**
   ```bash
   cd reactapp
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## 🔒 Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=your_api_url
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
Made with ❤️ by Your Team
</div>
