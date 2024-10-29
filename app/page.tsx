"use client";

import { useCurrenciesSocket } from "./_hooks/useCurrenciesSocket";
import CryptoTable from "./_components/CryptoTable";

const CryptoDataDisplay = () => {
  const { cryptoData } = useCurrenciesSocket();

  return CryptoTable({ data: cryptoData });
};

export default CryptoDataDisplay;
