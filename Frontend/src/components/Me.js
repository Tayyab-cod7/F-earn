import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper, Grid, Button, List, ListItem, ListItemText, ListItemIcon, CircularProgress } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaymentIcon from '@mui/icons-material/Payment';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person'; // Icon for user info
import PhoneIcon from '@mui/icons-material/Phone'; // Icon for phone
import EmailIcon from '@mui/icons-material/Email'; // Icon for email
import GroupIcon from '@mui/icons-material/Group'; // Icon for referrer
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext

const Me = () => {
  const navigate = useNavigate();
  const { user, logout, loading: authLoading } = useAuth(); // Get user, logout, and auth loading from context

  const [balance, setBalance] = useState(0);
  const [loadingBalance, setLoadingBalance] = useState(true);

  // Simulate fetching user data (replace with your actual API call)
  useEffect(() => {
    // In a real app, fetch user data from backend here
    // This effect is mainly for demonstrating balance loading.
    // User details (username, phone, email, referredBy) should ideally come from useAuth().user

    const fetchBalance = async () => {
      setLoadingBalance(true);
      try {
        // Replace with your actual API call to fetch balance:
        // const response = await axios.get(`${config.API_URL}/api/user/balance`, { headers: { 'x-auth-token': localStorage.getItem('token') } });
        // setBalance(response.data.balance);

        // Simulate success
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        setBalance(1500); // Dummy balance
      } catch (error) {
        console.error('Failed to fetch balance:', error);
        // Handle error (e.g., show error message)
      } finally {
        setLoadingBalance(false);
      }
    };
    
    // Only fetch balance if user data is loaded (or not loading from auth)
    if (!authLoading && user) {
       fetchBalance();
    }

  }, [authLoading, user]); // Re-run if auth loading or user changes

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate('/login'); // Redirect to login page
  };

  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)', // Adjust for bottom navbar height
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)', // F-Earn gradient
      color: '#fff',
      p: 3,
      overflowY: 'auto', // Enable scrolling if needed
      overflowX: 'hidden',
      '&::-webkit-scrollbar': { display: 'none' },
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}>
      <Container maxWidth="sm">
        {/* User Info Card */}
        <Paper elevation={6} sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#fff',
        }}>
           {authLoading || !user ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
               <CircularProgress size={24} color="primary" />
               <Typography>Loading user info...</Typography>
            </Box>
           ) : (
            <Grid container spacing={2}>
              <Grid xs={12}><Typography variant="h6" gutterBottom sx={{ color: '#00ff88' }}>Account Details</Typography></Grid>
              <Grid xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 <PersonIcon sx={{ color: '#bdbdbd' }} />
                 <Typography>Username: {user.username}</Typography>
              </Grid>
              <Grid xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 <PhoneIcon sx={{ color: '#bdbdbd' }} />
                 <Typography>Phone: {user.phoneNumber}</Typography>
              </Grid>
               <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                 <EmailIcon sx={{ color: '#bdbdbd' }} />
                 <Typography>Email: {user.email}</Typography>
              </Grid>
              {user.referredByReferralCode && ( // Assuming backend provides referredByReferralCode
                 <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <GroupIcon sx={{ color: '#bdbdbd' }} />
                    <Typography>Leader Code: {user.referredByReferralCode}</Typography>
                 </Grid>
              )}
            </Grid>
           )}
        </Paper>

        {/* Balance Card */}
        <Paper elevation={6} sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
          background: 'rgba(0,255,136,0.1)', // Subtle green background
          border: '1px solid rgba(0,255,136,0.2)',
          textAlign: 'center',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Typography variant="subtitle1" sx={{ color: '#bdbdbd' }}>Current Balance</Typography>
          {loadingBalance ? (
            <CircularProgress size={24} color="primary" sx={{ mt: 1 }} />
          ) : (
            <Typography variant="h4" sx={{ color: '#00ff88', fontWeight: 700, mt: 1 }}>
              Rs. {balance.toFixed(2)}
            </Typography>
          )}
        </Paper>

        {/* Recharge and Withdraw Card */}
        <Paper elevation={6} sx={{
          p: 2,
          mb: 3,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.05)',
          display: 'flex',
          gap: 2,
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}>
          <Button
            variant="contained"
            startIcon={<AddCardIcon />}
            sx={{ 
              flex: 1, 
              minWidth: 150, 
              background: 'linear-gradient(45deg, #00ff88 30%, #2196F3 90%)', // Gradient button
              color: '#121212', 
              fontWeight: 700, 
              '&:hover': { background: 'linear-gradient(45deg, #2196F3 30%, #00ff88 90%)' }
            }}
            onClick={() => navigate('/recharge')}
          >
            Recharge
          </Button>
          <Button
            variant="contained"
            startIcon={<PaymentIcon />}
             sx={{ 
              flex: 1, 
              minWidth: 150,
              background: 'linear-gradient(45deg, #ff4081 30%, #fbc02d 90%)', // Another gradient button
              color: '#121212', 
              fontWeight: 700, 
               '&:hover': { background: 'linear-gradient(45deg, #fbc02d 30%, #ff4081 90%)' }
             }}
            onClick={() => navigate('/withdraw')}
          >
            Withdraw
          </Button>
        </Paper>

        {/* Options List */}
        <Paper elevation={6} sx={{
          mb: 3,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.05)',
          color: '#fff',
        }}>
          <List>
            <ListItem button={true} component="li" onClick={() => { /* Navigate to Recharge Record */ console.log('Navigate to Recharge Record'); }}>
              <ListItemIcon><HistoryIcon sx={{ color: '#00ff88' }} /></ListItemIcon>
              <ListItemText primary="Recharge Record" />
            </ListItem>
            <ListItem button={true} component="li" onClick={() => { /* Navigate to Withdrawal Record */ console.log('Navigate to Withdrawal Record'); }}>
              <ListItemIcon><HistoryIcon sx={{ color: '#ff4081' }} /></ListItemIcon>
              <ListItemText primary="Withdrawal Record" />
            </ListItem>
            <ListItem button={true} component="li" onClick={() => { /* Navigate to About Us */ console.log('Navigate to About Us'); }}>
              <ListItemIcon><InfoIcon sx={{ color: '#2196F3' }} /></ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItem>
            <ListItem button={true} component="li" onClick={() => { /* Navigate to Contact Us */ console.log('Navigate to Contact Us'); }}>
              <ListItemIcon><ContactMailIcon sx={{ color: '#fbc02d' }} /></ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
            <ListItem button={true} component="li" onClick={handleLogout} sx={{ color: '#ff1744' }}>
              <ListItemIcon><LogoutIcon sx={{ color: '#ff1744' }} /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Me; 