const express = require('express');
const app = express();
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use("/api/v1", apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message
    || "internal server error");
});

app.listen(3001, () => {
  console.log("Listening on port 3001")
});
