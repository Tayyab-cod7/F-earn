import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const TermsAndConditions = () => {
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
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom sx={{ color: '#00ff88', fontWeight: 700, mb: 3 }}>
          Terms and Conditions
        </Typography>
        <Typography variant="body1" sx={{ color: '#bdbdbd', textAlign: 'left' }}>
          {/* Add your terms and conditions content here */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          <br /><br />
          Section 1. Your Use of the Service<br />
          Section 2. Privacy Policy<br />
          Section 3. Limitation of Liability<br />
          Section 4. Governing Law
        </Typography>
      </Container>
    </Box>
  );
};

export default TermsAndConditions; 