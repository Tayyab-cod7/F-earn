import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #ff1744 30%, #ff4081 90%)' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <AccountBalanceWalletIcon sx={{ mr: 1 }} />
            <Typography 
              variant="h5" 
              component={Link}
              to="/"
              sx={{ 
                fontWeight: 'bold',
                letterSpacing: '1px',
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              F-EARN
            </Typography>
          </Box>
          <Box>
            {token ? (
              <>
                <Typography 
                  variant="body1" 
                  component="span" 
                  sx={{ 
                    mr: 2,
                    fontWeight: 'medium'
                  }}
                >
                  Welcome, {user.username}
                </Typography>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  variant="outlined"
                  sx={{ 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link}
                  to="/login"
                  sx={{ mr: 1 }}
                >
                  Login
                </Button>
                <Button 
                  color="inherit" 
                  component={Link}
                  to="/register"
                  variant="outlined"
                  sx={{ 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 