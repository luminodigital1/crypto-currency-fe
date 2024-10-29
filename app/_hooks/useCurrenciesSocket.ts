"use client";

import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

export const useCurrenciesSocket = () => {
  const [cryptoData, setCryptoData] = useState<{
    [key: string]: { percentageChange: number[]; timestamps: Date[] };
  }>({});
  const [incomingData, setIncomingData] = useState<CryptoData[]>([]);

  const cryptoDataRef = useRef(cryptoData);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("cryptoCurrencies", (data: CryptoData[]) => {
      console.log("Received crypto data:", data);
      setIncomingData(data);

      data.forEach(({ currency, percentageChange, currentTime }) => {
        if (!cryptoDataRef.current[currency]) {
          cryptoDataRef.current[currency] = {
            percentageChange: [],
            timestamps: [],
          };
        }

        cryptoDataRef.current[currency].percentageChange.push(percentageChange);
        cryptoDataRef.current[currency].timestamps.push(new Date(currentTime));
      });

      setCryptoData({ ...cryptoDataRef.current });
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return { cryptoData, incomingData };
};
