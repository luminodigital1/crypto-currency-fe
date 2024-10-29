"use client";

import React from 'react';
import { useCurrenciesSocket } from './_hooks/useCurrenciesSocket';

const CryptoDataDisplay = () => {
    const { cryptoData } = useCurrenciesSocket();

    return (
        <div>
            <h1>Live Cryptocurrency Data</h1>
            {cryptoData ? (
                <ul>
                    {cryptoData.map((crypto, index) => (
                        <li key={index}>
                            {crypto.name}: ${crypto.price} (updated at: {new Date(crypto.currentTime).toLocaleTimeString()})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default CryptoDataDisplay;
