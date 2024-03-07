import React from "react";
import { nomo } from "nomo-webon-kit";

interface State {
    addresses: string[];
}

class Test extends React.Component<NonNullable<unknown>, State> {
    constructor(props: NonNullable<unknown>) {
        super(props);
        this.state = {
            addresses: []
        };
    }

    componentDidMount() {
        nomo.getWalletAddresses().then((addresses) => {
            this.setState({addresses: [JSON.stringify(addresses.walletAddresses)]});
        })
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>Wallet Addresses</h2>
                <ul>
                    {this.state.addresses.map((address, index) => (
                        <li key={index}>{address}</li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Test;