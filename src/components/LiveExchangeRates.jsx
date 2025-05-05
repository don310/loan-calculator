import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useCurrency } from '../context/CurrencyContext';

const LiveExchangeRates = () => {
  const { rates, base } = useCurrency();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rates) {
      setLoading(false);
    }
  }, [rates]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Live Exchange Rates</Typography>
      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Exchange rates based on {base} currency
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Currency</TableCell>
                  <TableCell>Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(rates).map((currencyCode) => (
                  <TableRow key={currencyCode}>
                    <TableCell>{currencyCode}</TableCell>
                    <TableCell>{rates[currencyCode]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default LiveExchangeRates;
