import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Home = () => {
  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)', // Adjust for bottom navbar height
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
      color: 'white',
      p: 3,
    }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ color: '#00ff88', fontWeight: 700, mb: 4, textAlign: 'center' }}>
          Welcome Home!
        </Typography>
        
        <Grid container spacing={4}> {/* Grid for layout */}
          {/* Section 1 */}
          <Grid item xs={12} md={6}>
            <Card sx={{
              background: 'rgba(40, 40, 40, 0.9)',
              borderRadius: 3,
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              height: '100%', // Make cards same height
            }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <HomeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: '#00ff88' }}>
                  Overview
                </Typography>
                <Typography variant="body1" sx={{ color: '#bdbdbd' }}>
                  Get a quick summary of your account and recent activities here.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Section 2 */}
          <Grid item xs={12} md={6}>
            <Card sx={{
              background: 'rgba(40, 40, 40, 0.9)',
              borderRadius: 3,
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
              height: '100%',
            }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <InfoIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: '#00ff88' }}>
                  About F-EARN
                </Typography>
                <Typography variant="body1" sx={{ color: '#bdbdbd' }}>
                  Learn more about our platform and how it works.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Section 3 (Example) */}
          <Grid item xs={12}>
             <Card sx={{
              background: 'rgba(40, 40, 40, 0.9)',
              borderRadius: 3,
              boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <CardContent>
                 <Typography variant="h6" gutterBottom sx={{ color: '#00ff88' }}>
                  Quick Links
                </Typography>
                 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 3 }}>
                     <Box sx={{ textAlign: 'center' }}>
                         <SettingsIcon sx={{ fontSize: 40, color: '#bdbdbd' }} />
                         <Typography variant="body2" sx={{ color: '#bdbdbd', mt: 1 }}>Settings</Typography>
                     </Box>
                      <Box sx={{ textAlign: 'center' }}>
                         <AssignmentIcon sx={{ fontSize: 40, color: '#bdbdbd' }} />
                         <Typography variant="body2" sx={{ color: '#bdbdbd', mt: 1 }}>Your Tasks</Typography>
                     </Box>
                 </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 