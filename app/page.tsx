"use client";

import { Box } from "@mui/material";

import { useCurrenciesSocket } from "./_hooks/useCurrenciesSocket";

import CryptoTable from "./_components/CryptoTable";
import CryptoGraph from "./_components/CryptoGraph";

import { CryptoCurrency } from "./_utils/constants";

const CryptoDataDisplay = () => {
  const { cryptoData, incomingData } = useCurrenciesSocket();

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
      <h1>Cryptocurrency Price Updates</h1>
      <CryptoGraph
        data={cryptoData}
        selectedCurrency={CryptoCurrency.Bitcoin}
      />
      <CryptoTable data={incomingData} />
    </Box>
  );
};

export default CryptoDataDisplay;
