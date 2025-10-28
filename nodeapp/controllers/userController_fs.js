
const fs = require('fs');
const path = require('path');

const usersDataFile = path.join(__dirname, '../usersData.json');
let usersData = [];

if (fs.existsSync(usersDataFile)) {
  const rawData = fs.readFileSync(usersDataFile, 'utf8');
  usersData = rawData.trim() ? JSON.parse(rawData) : [];
}

const register_fs = (req, res) => {
  try {
    const { username, email, password, mobileNumber, userRole } = req.body;
    
    // Check if email already exists
    const existingUser = usersData.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: true, message: 'Email already exists' });
    }
    
    const newUser = {
      id: usersData.length + 1,
      username,
      email,
      password,
      mobileNumber,
      userRole
    };
    
    usersData.push(newUser);
    fs.writeFileSync(usersDataFile, JSON.stringify(usersData, null, 2));
    
    res.status(201).json({ error: false, message: 'User registered successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const login_fs = (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = usersData.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
    
    res.status(200).json({ error: false, message: 'Login successful', data: user });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const resetPassword_fs = (req, res) => {
  try {
    const { email, newPassword } = req.body;
    
    const userIndex = usersData.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }
    
    usersData[userIndex].password = newPassword;
    fs.writeFileSync(usersDataFile, JSON.stringify(usersData, null, 2));
    
    res.status(200).json({ error: false, message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const getAllUsers_fs = (req, res) => {
  try {
    const usersWithoutPasswords = usersData.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.status(200).json({ error: false, message: 'Users retrieved successfully', data: usersWithoutPasswords });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  register_fs,
  login_fs,
  resetPassword_fs,
  getAllUsers_fs
};