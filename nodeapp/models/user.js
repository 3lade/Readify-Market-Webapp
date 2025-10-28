const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."]
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    lowercase: true,
    trim: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required."]
  },
  password: {
    type: String,
    required: [true, "Password is required."]
  },
  userRole: {
    type: String,
    required: [true, "User Role is required."]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);