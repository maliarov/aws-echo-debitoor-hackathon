
const express = require('express');
const alexa = require('alexa-app');

const PORT = process.env.PORT || 8080;
const app = express();

// ALWAYS setup the alexa app and attach it to express before anything else.
const alexaApp = new alexa.app('amzn1.ask.skill.4a5bae8a-ef54-41a0-94c5-df320e2c5352');

alexaApp.express({
  expressApp: app,
  //router: express.Router(),

  endpoint: '/echo',

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: true
});

alexaApp.launch((req, res) => {
  res.say('Welcome to Debitoor App!');
});

alexaApp.intent('getUnpaidInvoicesCount', {
    'slots': { },
    'utterances': [
        'get unpaid invoices count',
        'unpaid invoices count',
        'for unpaid invoices count',
        'how many unpaid invoices do I have'
     ]
  },
  (req, res) => {
    res.say('You have one unpaid invoice!');
  }
);

app.listen(PORT, () => console.log('Listening on port ' + PORT + '.'));