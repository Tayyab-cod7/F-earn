import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Task = () => {
  return (
    <Box sx={{
      minHeight: 'calc(100vh - 64px)', // Adjust for bottom navbar height
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: 3,
      textAlign: 'center',
    }}>
      <Container>
        <Typography variant="h4" gutterBottom>Task Page</Typography>
        <Typography variant="body1">Content for the Task page will go here.</Typography>
      </Container>
    </Box>
  );
};

export default Task; 