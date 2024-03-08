import './App.css'
import { useEffect, useState } from "react";
import { nomo } from "nomo-webon-kit";
import { MoonPayBuyWidget, MoonPayProvider } from '@moonpay/moonpay-react';

export default function App() {
    const [currencies, setCurrencies] = useState<string>("");
    const [wallets, setWallets] = useState<string>("");


    useEffect(() => {
        nomo.getWalletAddresses().then((addresses) => {
            const walletsData = addresses.walletAddresses;
            const processedWallets: Record<string, string> = {};
            const currencyList = [];

            for (const [key, value] of Object.entries(walletsData)) {
                // Convert key to lowercase
                const lowerKey = key.toLowerCase();
                processedWallets[lowerKey] = value;
                // Add the lowercase key to the currency list
                currencyList.push(lowerKey);
            }
            const walletsJsonString = JSON.stringify(processedWallets);
            // Save the processed wallets as JSON
            setWallets(walletsJsonString);
            setCurrencies(currencyList.join(','));
        });
    }, []);


    console.log("currencies", currencies);

    const apiKey = import.meta.env.VITE_API_KEY_TEST;
    return (
        <MoonPayProvider
            apiKey={apiKey}
        >
            {currencies.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
                    <MoonPayBuyWidget
                        variant="embedded"
                        baseCurrencyCode="usd"
                        baseCurrencyAmount="100"
                        defaultCurrencyCode="eth"
                        theme='dark'
                        walletAddresses={wallets}
                        showOnlyCurrencies={currencies}

                    />
                </div>
            )}
        </MoonPayProvider>
    )
}
