"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

export const useCurrenciesSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [cryptoData, setCryptoData] = useState<{
    [key: string]: { prices: number[]; timestamps: string[] };
  }>({});

  const [incomingData, setIncomingData] = useState<CryptoData[]>([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("cryptoCurrencies", (data) => {
      console.log("Received crypto data:", data);
      setIncomingData(data);

      data.forEach(
        (newData: { currency: any; price: any; currentTime: any }) => {
          const { currency, price, currentTime } = newData;

          if (!cryptoData[currency]) {
            cryptoData[currency] = { prices: [], timestamps: [] };
          }

          cryptoData[currency].prices.push(price);
          cryptoData[currency].timestamps.push(currentTime);

          setCryptoData({ ...cryptoData });
        }
      );
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [cryptoData, incomingData]);

  return { cryptoData, incomingData };
};
