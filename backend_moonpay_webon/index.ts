import { MoonPay } from '@moonpay/moonpay-node';
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config();

const apikey = process.env.SK_LIVE || "test";
const moonPay = new MoonPay(apikey);
const app = express();

app.use(cors());

app.get('/moonpay_signature', (req, res) => {
    const { url } = req.query;

    console.log(req.query);
    if (typeof url !== 'string') {
        res.status(400).send('Invalid url');
        return;
    }
    const signature = moonPay.url.generateSignature(url);

    console.log("url", url);

    console.log("signature", signature);

    const checkURL = url + "&signature=" + signature;
    const isSignatureValid = moonPay.url.isSignatureValid(checkURL);

    console.log("isSignatureValid", isSignatureValid);


    res.send({ signature });
});


const port = process.env.PORT || 3000

app.listen(port, () =>
    console.log('Listening on port ' + port + "!"),
);