const express = require('express');
require('dotenv').config();

const { apiRouter } = require('./api/router');
const app = express();

app.use('/api', apiRouter);

// you can change the port by providing a HTTP_PORT in your .env
// copy .env.example and name the file .env and edit the HTTP_PORT
const port = process.env.HTTP_PORT || 9000;
app.listen(port, () => {
  console.log(`Your server is listening on port ${port}`);
  if (process.env.NODE_ENV === 'development') {
    console.log('The server is running in DEVELOPMENT mode');
  }
});
