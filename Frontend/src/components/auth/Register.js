import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import config from '../../config';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const referralCodeFromUrl = queryParams.get('ref') || '';

  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: '',
    referralCode: referralCodeFromUrl
  });
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [referralCodeError, setReferralCodeError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [newReferralCode, setNewReferralCode] = useState('');


  const validateUsername = (username) => {
    if (!username) {
      setUsernameError('Username is required');
      return false;
    }
    if (username.length < 6 || username.length > 8) {
      setUsernameError('Username must be between 6 and 8 characters');
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setUsernameError('Username can only contain letters and numbers');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validatePhoneNumber = (phone) => {
    if (!phone) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (!/^\d+$/.test(phone)) {
      setPhoneError('Phone number can only contain digits');
      return false;
    }
    if (phone.length !== 11) {
      setPhoneError('Phone number must be exactly 11 digits');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateEmail = (email) => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!email.endsWith('@gmail.com')) {
      setEmailError('Please use a Gmail address (@gmail.com)');
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      setEmailError('Please enter a valid Gmail address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    }
    if (password.length < 6 || password.length > 8) {
      setPasswordError('Password must be between 6 and 8 characters');
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      setPasswordError('Password can only contain letters and numbers');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateReferralCode = (code) => {
    if (!code) {
      setReferralCodeError('Referral code is required');
      return false;
    }
    if (!/^\d{6}$/.test(code)) {
      setReferralCodeError('Referral code must be exactly 6 digits');
      return false;
    }
    setReferralCodeError('');
    return true;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'username') {
      validateUsername(value);
    } else if (name === 'phoneNumber') {
      validatePhoneNumber(value);
    } else if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePassword(value);
    } else if (name === 'referralCode') {
      validateReferralCode(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!termsAccepted) {
      setError('Please accept the terms and conditions.');
      return;
    }
    
    if (!validateUsername(formData.username)) {
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      return;
    }

    if (!validateEmail(formData.email)) {
      return;
    }

    if (!validatePassword(formData.password)) {
      return;
    }

    if (!validateReferralCode(formData.referralCode)) {
      return;
    }

    try {
      const registerData = formData;
      const response = await axios.post(`${config.API_URL}/api/auth/register`, registerData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setNewReferralCode(response.data.user.referralCode);
        setSuccessDialogOpen(true);
      } else {
        setError('Registration successful but no token received');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.message === 'Invalid referral code') {
        setReferralCodeError('Referral code is invalid. Please check and try again.');
      } else {
      setError(err.response?.data?.message || 'An error occurred during registration. Please try again.');
      }
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
        display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      p: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
      height: 'calc(100vh - 64px)',
      '&::-webkit-scrollbar': { display: 'none' },
      scrollbarWidth: 'none',
      msOverflowStyle: '-ms-autohiding-scrollbar',
      position: 'relative',
    }}>
      <Box sx={{ 
        flex: 1, 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        overflowX: 'hidden'
      }}>
        <Container maxWidth={false} disableGutters sx={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper
          elevation={8}
          sx={{
              p: { xs: 1.5, sm: 2.5, md: 3 },
              width: { xs: '95vw', sm: '450px', md: '500px' },
              maxWidth: '98vw',
              borderRadius: 4,
            background: 'rgba(30, 30, 30, 0.85)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              mt: { xs: 2, sm: 3 },
              mb: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 0.5, color: '#fff', textAlign: 'center' }}>
              Sign Up for F-Earn
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#bdbdbd', mb: 1.2, textAlign: 'center', fontSize: '1rem' }}>
              Start earning money online - create your account today
            </Typography>
          {error && (
              <Alert severity="error" sx={{ mb: 1.2 }}>
              {error}
            </Alert>
          )}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
                margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              error={!!usernameError}
                helperText={usernameError || '6-8 characters, letters and numbers only'}
              inputProps={{
                maxLength: 8,
                pattern: '[a-zA-Z0-9]*'
              }}
                sx={{ mb: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
            <TextField
                margin="dense"
              required
              fullWidth
              id="phoneNumber"
                label="Enter your phone number"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!phoneError}
                helperText={phoneError || 'Please enter exactly 11 digits'}
              inputProps={{
                maxLength: 11,
                pattern: '[0-9]*',
                inputMode: 'numeric'
              }}
                sx={{ mb: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
            <TextField
                margin="dense"
              required
              fullWidth
              id="email"
              label="Gmail Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!emailError}
                helperText={emailError || 'Please use your Gmail address'}
              placeholder="example@gmail.com"
                sx={{ mb: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
            <TextField
                margin="dense"
              required
              fullWidth
              name="password"
                label="Create a password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!passwordError}
                helperText={passwordError || '6-8 characters, letters and numbers only'}
              inputProps={{
                maxLength: 8,
                pattern: '[a-zA-Z0-9]*',
                style: { letterSpacing: '0.1em' }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: '#bdbdbd' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { background: 'rgba(255,255,255,0.04)', borderRadius: 8 }
              }}
                sx={{ mb: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
                InputLabelProps={{ style: { color: '#bdbdbd' } }}
              />
              <TextField
                margin="dense"
                required
                fullWidth
                id="referralCode"
                label="Enter referral code"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                error={!!referralCodeError}
                helperText={referralCodeError || 'Enter 6 digit referral code'}
                inputProps={{
                  maxLength: 6,
                  pattern: '[0-9]*',
                  inputMode: 'numeric'
                }}
                sx={{ mb: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
              <FormControlLabel
                control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} sx={{ color: '#00ff88', '&.Mui-checked': { color: '#00ff88' } }} />}
                label={
                  <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                    I agree to the <Link to="/terms-and-conditions" style={{ color: '#00ff88', textDecoration: 'none' }}>Terms and Conditions</Link>
                  </Typography>
                }
                sx={{ mb: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
                disabled={!termsAccepted}
              sx={{
                  mb: 1,
                  py: 1.2,
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                background: 'linear-gradient(90deg, #00ff88 0%, #2196F3 100%)',
                  color: '#fff',
                  borderRadius: 2,
                boxShadow: '0 2px 8px 0 rgba(33,203,243,0.15)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #21CBF3 0%, #00ff88 100%)',
                    color: '#fff',
                },
              }}
            >
                Create Account
            </Button>
              <Box sx={{ textAlign: 'center', mt: 0.5 }}>
                <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#00ff88', textDecoration: 'none', fontWeight: 600 }}>
                    Login
                  </Link>
                </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
      </Box>
      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onClose={() => { setSuccessDialogOpen(false); navigate('/home'); }}>
        <DialogTitle>Registration Successful!</DialogTitle>
        <DialogContent>
          <Typography>Your account has been created.</Typography>
          <Typography sx={{ mt: 2, fontWeight: 700, color: '#00ff88' }}>Your Referral Code: {newReferralCode}</Typography>
          <Typography sx={{ mt: 1, color: '#888' }}>Share this code with others to earn rewards!</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => { setSuccessDialogOpen(false); navigate('/home'); }}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Register; 