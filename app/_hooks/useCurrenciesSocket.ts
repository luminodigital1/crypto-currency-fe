
"use client";

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

interface CryptoData {
    name: string;
    price: number;
    currentTime: number;
  }

export const useCurrenciesSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

    useEffect(() => {
        const newSocket = io(SOCKET_URL);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        newSocket.on('cryptoCurrencies', (data) => {
            console.log('Received crypto data:', data);
            setCryptoData(data);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return { cryptoData };
};
