const express = require('express');
const twilio = require('twilio');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();

const app = express();

app.use(express.json());

app.post('/voice', twilio.webhook(), (req, res) => {
  // Twilio Voice URL - receives incoming calls from Twilio
  console.log(req.body);
  const response = new VoiceResponse();

  response.say(
    `Thanks for calling!
     Your phone number is ${req.body.From}. I got your call because of Twilio´s
     webhook. Goodbye!`
  );

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
    console.log('Escuchando en el puerto '+process.env.PORT);
});