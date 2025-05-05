import React, { useState } from 'react';
import { TextField, Typography, Box, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useEMICalculator } from '../hooks/useEMICalculator';
import { useCurrency } from '../context/CurrencyContext';

const EMIForm = () => {
  const [loan, setLoan] = useState(100000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(5); // Update to years
  const [currency, setCurrency] = useState('USD');
  const [schedule, setSchedule] = useState([]);
  
  // Convert years to months for calculation
  const months = years * 12;
  const emi = useEMICalculator(loan, rate, months);

  const { rates } = useCurrency();
  const convertedEMI = (emi * (rates[currency] || 1)).toFixed(2);

  // Function to generate Amortization Schedule
  const generateAmortizationSchedule = (loanAmount, interestRate, months) => {
    const monthlyRate = interestRate / 12 / 100;
    const schedule = [];
    let balance = loanAmount;

    for (let month = 1; month <= months; month++) {
      const interest = balance * monthlyRate;
      const principal = emi - interest;
      balance -= principal;

      schedule.push({
        month,
        principal: principal.toFixed(2),
        interest: interest.toFixed(2),
        remainingBalance: balance.toFixed(2),
      });
    }

    return schedule;
  };

  // Handle the calculation of the amortization schedule
  const handleCalculate = () => {
    const amortizationSchedule = generateAmortizationSchedule(loan, rate, months);
    setSchedule(amortizationSchedule);
  };

  // Reset the form and table
  const handleReset = () => {
    setLoan(100000);
    setRate(7.5);
    setYears(5);
    setCurrency('USD');
    setSchedule([]);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Loan EMI Calculator</Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField label="Loan Amount" type="number" value={loan} onChange={e => setLoan(+e.target.value)} fullWidth />
        <TextField label="Interest Rate (%)" type="number" value={rate} onChange={e => setRate(+e.target.value)} fullWidth />
        <TextField label="Duration (Years)" type="number" value={years} onChange={e => setYears(+e.target.value)} fullWidth /> {/* Duration in years */}
        <TextField select label="Currency" value={currency} onChange={e => setCurrency(e.target.value)} fullWidth>
          {Object.keys(rates).map(code => (
            <MenuItem key={code} value={code}>{code}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mt: 2 }}>
        Calculate
      </Button>
      <Button variant="outlined" onClick={handleReset} sx={{ mt: 2, ml: 2 }}>
        Reset
      </Button>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Monthly EMI: {convertedEMI} {currency}
      </Typography>

      {/* Amortization Schedule Table */}
      {schedule.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Amortization Schedule ({currency})
          </Typography>
          
          <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
            <Table stickyHeader aria-label="amortization schedule">
              <TableHead>
                <TableRow>
                  <TableCell>Month</TableCell>
                  <TableCell>Principal</TableCell>
                  <TableCell>Interest</TableCell>
                  <TableCell>Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map(row => (
                  <TableRow key={row.month}>
                    <TableCell>{row.month}</TableCell>
                    <TableCell>{row.principal} {currency}</TableCell>
                    <TableCell>{row.interest} {currency}</TableCell>
                    <TableCell>{row.remainingBalance} {currency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default EMIForm;
