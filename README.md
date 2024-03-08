# MoonPay WebOn

This is a simple web app that uses the MoonPay API to allow users to buy crypto with a credit card.

## Getting Started
To get started, you will need to create a `.env` file in the root of the project with the following contents:
- `MOONPAY_API_KEY_TEST`: Your MoonPay API key for the test environment

```bash
npm install
npm run dev
```

## Deploy

To deploy the app, you will need to create a `.env` file in the root of the project with the following contents:
- `MOONPAY_API_KEY_LIVE`: Your MoonPay API key for the live environment

```bash
npm run build
npm run deploy
```

