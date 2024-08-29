const bcrypt = require('bcrypt');
const User = require('../models/user');
const Admin = require('../models/admin');

exports.addUser = async (req, res) => {
    const { username, password, email, role } = req.body;
    console.log('working');
    try {
        let user = await User.findOne({ username ,role});
        console.log({username});
        if (user) return res.status(400).send('User already exists.');
        user = new User({ username, password, email, role});
        await user.save();
        res.status(201).send('User created successfully.');
      } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
      }
};

exports.editUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Hash the password if it is being updated
        let updatedFields = { username };
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          updatedFields.password = hashedPassword;
        }
        const user = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!user) return res.status(404).send('User not found');
        res.send('User updated successfully.');
    } catch (error) {
        res.status(500).send('Server error');
      }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send('User not found');
        res.send('User deleted successfully.');
      } catch (error) {
        res.status(500).send('Server error');
      }
};

exports.getUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({username});
    if (!admin) {
      return res.status(400).json({ message: 'Invalid username' });
    }
    const isMatch = password === admin.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};