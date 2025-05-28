import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Recharge = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 3,
      textAlign: 'center',
    }}>
      <Container>
        <Typography variant="h4" gutterBottom>Recharge Page</Typography>
        <Typography variant="body1">Content for the Recharge page will go here.</Typography>
      </Container>
    </Box>
  );
};

export default Recharge; 