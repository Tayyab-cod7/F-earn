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

// Delete a single user by ID (except admin) - Enhanced for data deletion and logout effect
router.delete('/user/:id', async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const io = req.app.get('io'); // Get Socket.IO instance

    const userToDelete = await User.findById(userIdToDelete);
    if (!userToDelete) return res.status(404).json({ message: 'User not found' });

    // Prevent deleting the admin user
    if (userToDelete.phoneNumber === '03151251123') {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }

    // --- Start: Comprehensive Data Deletion for a single user ---
    
    // 1. Remove this user as a referrer from other users' referredBy field
    await User.updateMany(
      { referredBy: userIdToDelete },
      { $unset: { referredBy: 1 }, $inc: { referralCount: -1 } }
    );

    // 2. Clear the user's investments array
    await User.findByIdAndUpdate(userIdToDelete, {
      $set: { investments: [] }
    });

    // 3. Reset the user's balance
    await User.findByIdAndUpdate(userIdToDelete, {
      $set: { balance: 0 }
    });

    // 4. Clear referral count
    await User.findByIdAndUpdate(userIdToDelete, {
      $set: { referralCount: 0 }
    });

    // 5. Remove referral code
    await User.findByIdAndUpdate(userIdToDelete, {
      $unset: { referralCode: 1 }
    });

    // 6. Finally, delete the user document itself
    await User.findByIdAndDelete(userIdToDelete);

    // --- End: Comprehensive Data Deletion ---

    // --- Start: Session/Token Invalidation ---
    // Emit socket event to force logout
    io.emit(`user_deleted_${userIdToDelete}`, { message: 'Your account has been deleted' });
    console.log(`User ID ${userIdToDelete} deleted. Socket event emitted for immediate logout.`);
    // --- End: Session/Token Invalidation ---

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting single user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Delete all users except admin - Enhanced for comprehensive data deletion
router.delete('/users', async (req, res) => {
  try {
    const io = req.app.get('io'); // Get Socket.IO instance
    
    // Find all non-admin users
    const usersToDelete = await User.find({ phoneNumber: { $ne: '03151251123' } });
    const userIdsToDelete = usersToDelete.map(user => user._id);

    if (userIdsToDelete.length === 0) {
      return res.json({ message: 'No non-admin users to delete' });
    }

    // --- Start: Comprehensive Data Deletion for multiple users ---
    
    // 1. Remove all deleted users as referrers from other users' referredBy field
    await User.updateMany(
      { referredBy: { $in: userIdsToDelete } },
      { $unset: { referredBy: 1 }, $inc: { referralCount: -1 } }
    );

    // 2. Clear investments for all users to be deleted
    await User.updateMany(
      { _id: { $in: userIdsToDelete } },
      { $set: { investments: [] } }
    );

    // 3. Reset balances for all users to be deleted
    await User.updateMany(
      { _id: { $in: userIdsToDelete } },
      { $set: { balance: 0 } }
    );

    // 4. Clear referral counts
    await User.updateMany(
      { _id: { $in: userIdsToDelete } },
      { $set: { referralCount: 0 } }
    );

    // 5. Remove referral codes
    await User.updateMany(
      { _id: { $in: userIdsToDelete } },
      { $unset: { referralCode: 1 } }
    );

    // 6. Finally, delete all non-admin user documents
    await User.deleteMany({ _id: { $in: userIdsToDelete } });

    // --- End: Comprehensive Data Deletion ---

    // --- Start: Session/Token Invalidation ---
    // Emit socket events for all deleted users
    userIdsToDelete.forEach(userId => {
      io.emit(`user_deleted_${userId}`, { message: 'Your account has been deleted' });
    });
    console.log(`${userIdsToDelete.length} users deleted. Socket events emitted for immediate logout.`);
    // --- End: Session/Token Invalidation ---

    res.json({ message: `Successfully deleted ${userIdsToDelete.length} users.` });
  } catch (error) {
    console.error('Error deleting all non-admin users:', error);
    res.status(500).json({ message: 'Error deleting users', error: error.message });
  }
});

module.exports = router; 