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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const handleNavigation = (path) => () => {
    navigate(path);
  };

  return (
    <AppBar position="fixed" color="primary" sx={{
      top: 'auto',
      bottom: 0,
      width: '100%',
      boxShadow: '0 -4px 10px rgba(0,0,0,0.2)',
      backgroundColor: '#1e1e1e',
      borderTop: '1px solid rgba(255,255,255,0.1)',
    }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-around', minHeight: '64px' }}>
          <Button color="inherit" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }} onClick={handleNavigation('/home')}>
            <HomeIcon />
            <Typography variant="caption">Home</Typography>
          </Button>
          <Button color="inherit" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }} onClick={handleNavigation('/task')}>
            <AssignmentIcon />
            <Typography variant="caption">Task</Typography>
          </Button>
          <Button color="inherit" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }} onClick={handleNavigation('/team')}>
            <GroupIcon />
            <Typography variant="caption">Team</Typography>
          </Button>
          <Button color="inherit" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }} onClick={handleNavigation('/vip')}>
            <DiamondIcon />
            <Typography variant="caption">VIP</Typography>
          </Button>
          <Button color="inherit" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textTransform: 'none' }} onClick={handleNavigation('/me')}>
            <PersonIcon />
            <Typography variant="caption">Me</Typography>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 