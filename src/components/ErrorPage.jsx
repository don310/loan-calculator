import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <Box sx={{ textAlign: 'center', mt: 8 }}>
    <Typography variant="h3" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="body1" gutterBottom>
      Sorry, the page you're looking for doesn't exist.
    </Typography>
    <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
      Go Back to Home
    </Button>
  </Box>
);

export default ErrorPage;
