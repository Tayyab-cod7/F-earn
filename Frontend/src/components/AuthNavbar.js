import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const AuthNavbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
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
            {location.pathname === '/login' ? (
               <Button 
                  color="inherit" 
                  component={Link}
                  to="/register"
                  variant="outlined"
                  sx={{ 
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 3,
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: 'white',
                      background: 'linear-gradient(90deg, #00c6fb 0%, #005bea 100%)',
                      color: 'white',
                    }
                  }}
                >
                  Register
                </Button>
            ) : (
               <Button 
                  color="inherit" 
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{ 
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: 3,
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: 'white',
                      background: 'linear-gradient(90deg, #00c6fb 0%, #005bea 100%)',
                      color: 'white',
                    }
                  }}
                >
                  Login
                </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AuthNavbar; 