const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.login = async (req, res) => {
  const { username, password, role } = req.body;
  console.log(username);
  try {
    // Check if the user exists
    const user = await User.findOne({ username, role });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or role' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate a token (optional)
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      'your_jwt_secret_key', // Replace with your actual secret key
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Send the token and user ID to the client
    res.json({ userId: user._id, token});
  } catch (err) {
    console.error('Server error', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  // Invalidate the JWT token (client-side action by deleting the token)
  res.json({ message: 'Logged out' });
};
