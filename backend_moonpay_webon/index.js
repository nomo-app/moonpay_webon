import { MoonPay } from '@moonpay/moonpay-node';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const apikey = process.env.SK_LIVE || "test";
const moonPay = new MoonPay(apikey);
const app = express();
app.get('/moonpay_signature', (req, res) => {
    const { url } = req.query;
    console.log(req.query);
    if (typeof url !== 'string') {
        res.status(400).send('Invalid url');
        return;
    }
    const signature = moonPay.url.generateSignature(url);
    res.send({ signature });
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port ' + port + "!"));
