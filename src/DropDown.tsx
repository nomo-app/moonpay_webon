import { nomo } from "nomo-webon-kit";
import { SetStateAction, useEffect, useState } from "react";


type AddressItem = {
    label: string;
    value: string;
};

function DropDownButton() {
    const [selectedValue, setSelectedValue] = useState('');

    const [addressItems, setAddressItems] = useState<AddressItem[]>([]);


    useEffect(() => {
        nomo.getWalletAddresses().then((addresses) => {
            const walletsData = addresses.walletAddresses;
            const processedWallets: Record<string, string> = {};

            for (const [key, value] of Object.entries(walletsData)) {
                // Convert key to lowercase
                const lowerKey = key.toLowerCase();
                processedWallets[lowerKey] = value;
            }

            const items = Object.entries(processedWallets)
                .filter(([_, value]) => value !== null) // Filter out entries where the value is null
                .map(([key, value]) => ({
                    label: key,
                    value: value,
                }));

            setAddressItems(items);

            if (items.length > 0) {
                setSelectedValue(items[0].value);
            }
        });
    }, []);

    console.log("addressItems", addressItems);

    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedValue(e.target.value);
    };

    const copyToClipboard = async (text: string) => {
        try {
            console.log('text', text);
            await navigator.clipboard.writeText(text);
            alert('Copied to clipboard: ' + text);
        } catch (err) {
            alert('Failed to copy:');
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '300px', margin: 'auto' }}>
            <h2 style={{ color: 'white' }}>Wallet Addresses</h2>
            <select onChange={handleChange} style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
            }}>
                {addressItems.map((item, index) => (
                    <option key={index} value={item.value}>
                        {`${item.label} : ${item.value}`}
                    </option>
                ))}
            </select>
            <button onClick={() => copyToClipboard(selectedValue)} style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#3C3C3D',
                color: 'white',
                border: 'none',
                cursor: 'pointer'
            }}>Copy to Clipboard</button>
        </div>
    );
}

export default DropDownButton;