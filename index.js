const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const VoiceResponse = twilio.twiml.VoiceResponse;
const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        ok: true,
        mensaje: "Prueba"
    });
});

app.post('/call', async (req, res) => {
    try {
        const twiml = new VoiceResponse();

        // Use the <Gather> verb to collect user input
        const gather = twiml.gather({ numDigits: 1 });
        gather.say('For sales, press 1. For support, press 2.');

        const call = await client.calls.create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: '+573136314570',
            from: '+19546268045',
            twiml: twiml.toString()
        });

        const callSid = call.sid;

        res.json({
            ok: true,
            resultado: callSid
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            resultado: error
        });
    }
});

app.post('/voice', twilio.webhook(), (req, res) => {
    const twiml = new VoiceResponse();

    // Use the <Gather> verb to collect user input
    const gather = twiml.gather({ numDigits: 1 });
    gather.say('For sales, press 1. For support, press 2.');

    // If the user doesn't enter input, loop
    twiml.redirect('/voice');

    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
});

app.post('/message', twilio.webhook(), (req, res) => {
    // Twilio Messaging URL - receives incoming messages from Twilio
    const response = new MessagingResponse();

    response.message(`Your text to me was ${req.body.Body.length} characters long.Webhooks are neat :)`);

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto ' + process.env.PORT);
});