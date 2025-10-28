const jwt = require('jsonwebtoken');

// Use a fixed secret key since you're not using .env
const SECRET_KEY = 'your-secret-key';

const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '24h'
  });
};

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    }
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { generateToken, validateToken };