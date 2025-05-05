import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState({});
  const [base, setBase] = useState('USD');

  useEffect(() => {
    axios.get(`https://v6.exchangerate-api.com/v6/5a972a78960eafd01a2acd6d/latest/USD`)
      .then(res => setRates(res.data.conversion_rates))
      .catch(err => console.error('Exchange API error:', err));
  }, [base]);

  return (
    <CurrencyContext.Provider value={{ rates, base, setBase }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);