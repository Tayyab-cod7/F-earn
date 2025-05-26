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

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === 'password') {
      validatePassword(value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validatePassword(formData.password)) {
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Check for admin credentials
        const isAdmin = (
          (formData.identifier === '03151251123' || response.data.user.phoneNumber === '03151251123') &&
          formData.password === 'admin123'
        );
        if (isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError('Login successful but no token received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 0,
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2, sm: 4, md: 6 },
            width: { xs: '95vw', sm: '400px', md: '400px' },
            maxWidth: '98vw',
            borderRadius: 5,
            background: 'rgba(30, 30, 30, 0.85)',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255,255,255,0.08)',
            mt: { xs: 2, sm: 4 },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <AccountBalanceWalletIcon sx={{ fontSize: { xs: 48, sm: 60 }, color: 'primary.main', mb: 1 }} />
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
              Login to F-EARN
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
              id="identifier"
              label="Email or Phone Number"
              name="identifier"
              autoComplete="username"
              autoFocus
              value={formData.identifier}
              onChange={handleChange}
              sx={{ mb: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
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
              autoComplete="current-password"
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
              sx={{ mb: 3, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mb: 2,
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
              Login
            </Button>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                  Don't have an account? Register
                </Typography>
              </Link>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login; 