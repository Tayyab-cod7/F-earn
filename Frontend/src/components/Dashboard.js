import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Your Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Balance Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Current Balance
              </Typography>
              <Typography variant="h5">
                ${user.balance || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Investment Stats Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Investments
              </Typography>
              <Typography variant="h5">
                {user.investments?.filter(inv => inv.status === 'active').length || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Deposit Funds
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Start Investment
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography color="textSecondary">
              No recent activity to display
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 