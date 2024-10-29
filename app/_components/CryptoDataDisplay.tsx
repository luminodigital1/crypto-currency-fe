"use client";

import { useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { useCurrenciesSocket } from "../_hooks/useCurrenciesSocket";

import CryptoTable from "../_components/CryptoTable";
import CryptoGraph from "../_components/CryptoGraph";

import { CryptoCurrency } from "../_utils/constants";
import React from "react";

const CryptoDataDisplay = () => {
  const { cryptoData, incomingData } = useCurrenciesSocket();

  const [selectedCurrency, setSelectedCurrency] =
    useState<CryptoCurrency | null>(CryptoCurrency.All);

  const handleCurrencyChange = (event: SelectChangeEvent<CryptoCurrency>) => {
    setSelectedCurrency(event.target.value as CryptoCurrency);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        sx={{
          color: "darkblue",
          mt: 2,
          mb: 2,
          padding: "10px",
          fontWeight: "bold",
          fontSize: "46px",
        }}
      >
        Cryptocurrency Price Updates
      </Typography>

      <FormControl
        variant="outlined"
        sx={{ marginBottom: "60px", marginTop: "30px", width: "500px" }}
      >
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          value={selectedCurrency || ""}
          onChange={handleCurrencyChange}
          label="Currency"
        >
          {Object.values(CryptoCurrency).map((currency) => (
            <MenuItem key={currency} value={currency}>
              {currency}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CryptoGraph data={cryptoData} selectedCurrency={selectedCurrency} />
      <CryptoTable data={incomingData} />
    </Box>
  );
};

export default CryptoDataDisplay;
