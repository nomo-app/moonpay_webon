import './App.css'
import { useState } from "react";
import { nomo } from "nomo-webon-kit";
import { MoonPayBuyWidget, MoonPayProvider } from '@moonpay/moonpay-react';

export default function App() {
    const [wallets, setWallets] = useState<string>("");
    nomo.getWalletAddresses().then((addresses) => {
        setWallets(Object.entries(addresses.walletAddresses).map(([key, value]) => {
            return wallets.length > 0 ? key : `${wallets},${key}`;
        }).join("\n"))
    });

    const apiKey = import.meta.env.VITE_API_KEY;
    return (
        <MoonPayProvider
            apiKey={apiKey}
        >
            {wallets.length > 0 && (
                <div style={{ width: '100svw', height: '100svh', margin: 0, padding: 0 }}>
                    <MoonPayBuyWidget
                        variant="embedded"
                        baseCurrencyCode="usd"
                        baseCurrencyAmount="100"
                        defaultCurrencyCode="eth"
                        // showOnlyCurrencies={wallets}
                        visible
                        style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}
                    />
                </div>)}
        </MoonPayProvider>
    )
}
