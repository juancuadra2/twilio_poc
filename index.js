const express = require('express');
const twilio = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();

const app = express();

app.use(express.json());

app.post('/voice', twilio.webhook(), (req, res) => {
    // Twilio Voice URL - receives incoming calls from Twilio

    const gather = response.gather({
        input: 'speech',
        action: '/completed'
    });

    gather.say('Welcome to Twilio, please tell us why you are calling');

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());

});

app.post('/message', twilio.webhook(), (req, res) => {
    // Twilio Messaging URL - receives incoming messages from Twilio
    const response = new MessagingResponse();

    response.message(`Your text to me was ${req.body.Body.length} characters long.
                    Webhooks are neat :)`);

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto ' + process.env.PORT);
});