import './App.css'
import { useState } from "react";
import { nomo } from "nomo-webon-kit";
import { MoonPayBuyWidget, MoonPayProvider } from '@moonpay/moonpay-react';

export default function App() {
    const [wallets, setWallets] = useState<string>("");
    nomo.getWalletAddresses().then((addresses) => {
        setWallets(Object.entries(addresses.walletAddresses).map(([key, value]) => {
            return wallets.length > 0 ? key : `${wallets},${key}`;
        }).join())
    });


    console.log("wallets", wallets);
    const apiKey = import.meta.env.VITE_API_KEY;
    return (
        <MoonPayProvider
            apiKey={apiKey}
        >
            {wallets.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>
                    <MoonPayBuyWidget
                        variant="embedded"
                        baseCurrencyCode="usd"
                        baseCurrencyAmount="100"
                        defaultCurrencyCode="eth"
                        theme='dark'
                        showOnlyCurrencies={wallets}
                    />
                </div>
            )}


        </MoonPayProvider>
    )
}
