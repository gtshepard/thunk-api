const express = require('express');
const app = express();
const apiRouter = ('./EndPoint')
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.listen(3001, () => {
  console.log("Listening on Port 3000");
});
