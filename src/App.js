import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeModeProvider, useThemeMode } from './context/ThemeContext';
import EMIForm from './components/EMIForm';
import Header from './components/Header';
import ErrorPage from './components/ErrorPage'; // Import ErrorPage
import LiveExchangeRates from './components/LiveExchangeRates'; // Import LiveExchangeRates page

function AppContent() {
  const { themeMode } = useThemeMode();
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CurrencyProvider>
        <Router>
          <Header />
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Routes>
              <Route path="/" element={<EMIForm />} />
              <Route path="/exchange-rates" element={<LiveExchangeRates />} />
              <Route path="/error" element={<ErrorPage />} /> {/* Error page route */}
              <Route path="*" element={<ErrorPage />} /> {/* Catch-all for unmatched routes */}
            </Routes>
          </Container>
        </Router>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}
