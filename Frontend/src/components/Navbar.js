import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => () => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
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
          <Button
            color="inherit"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textTransform: 'none',
              color: isActive('/home') ? '#00ff88' : 'inherit',
              fontWeight: isActive('/home') ? 'bold' : 'normal',
            }}
            onClick={handleNavigation('/home')}
          >
            <HomeIcon />
            <Typography variant="caption">Home</Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textTransform: 'none',
              color: isActive('/task') ? '#00ff88' : 'inherit',
              fontWeight: isActive('/task') ? 'bold' : 'normal',
            }}
            onClick={handleNavigation('/task')}
          >
            <AssignmentIcon />
            <Typography variant="caption">Task</Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textTransform: 'none',
              color: isActive('/team') ? '#00ff88' : 'inherit',
              fontWeight: isActive('/team') ? 'bold' : 'normal',
            }}
            onClick={handleNavigation('/team')}
          >
            <GroupIcon />
            <Typography variant="caption">Team</Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textTransform: 'none',
              color: isActive('/vip') ? '#00ff88' : 'inherit',
              fontWeight: isActive('/vip') ? 'bold' : 'normal',
            }}
            onClick={handleNavigation('/vip')}
          >
            <DiamondIcon />
            <Typography variant="caption">VIP</Typography>
          </Button>
          <Button
            color="inherit"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textTransform: 'none',
              color: isActive('/me') ? '#00ff88' : 'inherit',
              fontWeight: isActive('/me') ? 'bold' : 'normal',
            }}
            onClick={handleNavigation('/me')}
          >
            <PersonIcon />
            <Typography variant="caption">Me</Typography>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 