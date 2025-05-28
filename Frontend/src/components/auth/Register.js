import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import config from '../../config';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
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

    try {
      const registerData = formData;
      const response = await axios.post(`${config.API_URL}/api/auth/register`, registerData);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/home');
      } else {
        setError('Registration successful but no token received');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        p: 0,
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', overflow: 'hidden' }}>
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2, sm: 4, md: 5 },
            width: { xs: '95vw', sm: '450px', md: '500px' },
            maxWidth: '98vw',
            borderRadius: 5,
            background: 'rgba(30, 30, 30, 0.85)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255,255,255,0.08)',
            mt: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <AccountBalanceWalletIcon sx={{ fontSize: { xs: 48, sm: 60 }, color: 'primary.main', mb: 1 }} />
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Create Account
            </Typography>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!usernameError}
              helperText={usernameError}
              inputProps={{
                maxLength: 8,
                pattern: '[a-zA-Z0-9]*'
              }}
              sx={{ mb: 1.5, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!phoneError}
              helperText={phoneError}
              inputProps={{
                maxLength: 11,
                pattern: '[0-9]*',
                inputMode: 'numeric'
              }}
              sx={{ mb: 1.5, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Gmail Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError || "Please use your Gmail address"}
              placeholder="example@gmail.com"
              sx={{ mb: 1.5, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!passwordError}
              helperText={passwordError || "6-8 characters, letters and numbers only"}
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
              sx={{ mb: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 1.5,
                py: 1.5,
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                background: 'linear-gradient(90deg, #00ff88 0%, #2196F3 100%)',
                color: '#222',
                boxShadow: '0 2px 8px 0 rgba(33,203,243,0.15)',
                borderRadius: 3,
                transition: 'background 0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #21CBF3 0%, #00ff88 100%)',
                  color: '#111',
                },
              }}
            >
              Sign Up
            </Button>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                  Already have an account? Login
                </Typography>
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register; 