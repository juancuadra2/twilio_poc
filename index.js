const express = require('express');
const twilio = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();

const app = express();

app.use(express.json());

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