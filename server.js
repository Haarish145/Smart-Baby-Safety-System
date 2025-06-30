const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const toNumber = process.env.MY_PHONE_NUMBER;

app.post('/send-alert', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    client.messages
        .create({
            body: message,
            from: fromNumber,
            to: toNumber,
        })
        .then(message => {
            console.log('SMS sent, SID:', message.sid);
            res.json({ success: true, sid: message.sid });
        })
        .catch(error => {
            console.error('Error sending SMS:', error);
            res.status(500).json({ error: 'Failed to send SMS' });
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
