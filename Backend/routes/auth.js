const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); // If you want to protect the route

// Helper function to generate a unique 6-digit referral code
const generateReferralCode = async () => {
  let code;
  let isUnique = false;
  
  while (!isUnique) {
    // Generate a random 6-digit number
    code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Check if code already exists
    const existingUser = await User.findOne({ referralCode: code });
    if (!existingUser) {
      isUnique = true;
    }
  }
  
  return code;
};

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, phoneNumber, email, password, referralCode } = req.body;

    // Validate required fields
    if (!referralCode) {
      return res.status(400).json({ message: 'Referral code is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email }, 
        { username },
        { phoneNumber }
      ] 
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email, username, or phone number' });
    }

    // Find the referrer
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(400).json({ message: 'Invalid referral code' });
    }

    // Generate a unique referral code for the new user
    const newReferralCode = await generateReferralCode();

    // Create new user
    const user = new User({
      username,
      phoneNumber,
      email,
      password,
      referralCode: newReferralCode,
      referredBy: referrer._id
    });

    await user.save();

    // Increment referrer's referral count
    await User.findByIdAndUpdate(referrer._id, { $inc: { referralCount: 1 } });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        phoneNumber: user.phoneNumber,
        email: user.email,
        referralCode: user.referralCode
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find user by email or phone number
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phoneNumber: identifier }
      ]
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        phoneNumber: user.phoneNumber,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get all users (admin only)
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Delete a single user by ID (except admin)
router.delete('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.phoneNumber === '03151251123') {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Delete all users except admin
router.delete('/users', async (req, res) => {
  try {
    await User.deleteMany({ phoneNumber: { $ne: '03151251123' } });
    res.json({ message: 'All users (except admin) deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting users', error: error.message });
  }
});

module.exports = router; 