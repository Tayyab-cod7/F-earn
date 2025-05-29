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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import config from '../../config';

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
      const response = await axios.post(`${config.API_URL}/api/auth/login`, formData);
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
          navigate('/home');
        }
      } else {
        setError('Login successful but no token received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login. Please try again.');
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
      overflowX: 'hidden',
    }}>
      <Box sx={{ flex: 1, width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowX: 'hidden' }}>
        <Container maxWidth={false} disableGutters sx={{ width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 64px)', overflowX: 'hidden' }}>
        <Paper
          elevation={8}
          sx={{
              p: { xs: 2, sm: 4, md: 5 },
              width: { xs: '95vw', sm: '400px', md: '420px' },
            maxWidth: '98vw',
              borderRadius: 4,
            background: 'rgba(30, 30, 30, 0.85)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              mt: { xs: 2, sm: 3 },
              mb: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflowX: 'hidden',
            }}
          >
            <Typography component="h1" variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#fff', textAlign: 'center' }}>
              Welcome Back to F-Earn
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#bdbdbd', mb: 2, textAlign: 'center' }}>
              Access your earning dashboard securely
            </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="identifier"
                label="Enter your phone number or email"
              name="identifier"
              autoComplete="username"
              value={formData.identifier}
              onChange={handleChange}
                sx={{ mb: 1.5, background: 'rgba(255,255,255,0.04)', borderRadius: 2 }}
              InputLabelProps={{ style: { color: '#bdbdbd' } }}
                helperText={'Use your registered phone number or Gmail address'}
                inputProps={{ maxLength: 50 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
                label="Enter your password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
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
                  color: '#fff',
                  borderRadius: 2,
                boxShadow: '0 2px 8px 0 rgba(33,203,243,0.15)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #21CBF3 0%, #00ff88 100%)',
                    color: '#fff',
                },
              }}
            >
                Login to Account
            </Button>
            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography variant="body2" sx={{ color: '#bdbdbd' }}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: '#00ff88', textDecoration: 'none', fontWeight: 600 }}>
                    Sign up
                  </Link>
                </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
      </Box>
    </Box>
  );
};

export default Login; 