import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, useMediaQuery } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';

const Header = () => {
  const { themeMode, toggleTheme } = useThemeMode();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant={isMobile ? 'h6' : 'h5'}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Loan Calculator</Link>
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Home Link */}
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {/* Live Exchange Rates Link */}
          <Button color="inherit" component={Link} to="/exchange-rates">
            Live Exchange Rates
          </Button>

          {/* Error Page Link */}
          <Button color="inherit" component={Link} to="/error">
            Error Page
          </Button>

          {/* Theme toggle icon */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
