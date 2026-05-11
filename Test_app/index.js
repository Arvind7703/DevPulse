const express = require('express');

const {
  monitor,
  errors,
} = require('devpulse-sdk');

const app = express();

app.use(
  devpulse({
    apiKey: 'cmp1n40ai0001tce02gzj0plu',
    serverUrl: 'http://localhost:3000',
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  res.json({
    users: [],
  });
});

app.get('/crash', (req, res, next) => {
  next(new Error('Server Crashed'));
});

app.use(
  devpulseErrorHandler({
    apiKey: 'cmp1n40ai0001tce02gzj0plu', //test api key
    serverUrl: 'http://localhost:3000',
  }),
);

app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

app.listen(4000, () => {
  console.log('Test app running');
});