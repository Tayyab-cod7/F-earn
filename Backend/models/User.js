const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Basic user information
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  
  // Referral system fields
  referralCode: {
    type: String,
    unique: true,
    sparse: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  referralCount: {
    type: Number,
    default: 0
  },
  
  // Investment related fields
  balance: {
    type: Number,
    default: 0
  },
  investments: [{
    amount: Number,
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'completed'],
      default: 'pending'
    }
  }],
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

// --- TEMP: Create admin user if not exists ---
if (process.env.NODE_ENV !== 'production') {
  const User = module.exports;
  User.findOne({ phoneNumber: '03151251123' }).then(async (user) => {
    if (!user) {
      const admin = new User({
        username: 'admin',
        phoneNumber: '03151251123',
        email: 'admin@gmail.com',
        password: 'admin123',
        referralCode: '000000' // Set admin's referral code to 000000
      });
      await admin.save();
      console.log('Admin user created!');
    } else if (!user.referralCode) {
      // If admin exists but doesn't have a referral code, add it
      user.referralCode = '000000';
      await user.save();
      console.log('Admin referral code added!');
    }
  });
} 