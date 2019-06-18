const express = require('express');
const app = express();
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
//logging middleware
app.use(morgan('dev'));



//body parsing middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));


console.log("SESSION SECRET", process.env.SECRET)
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//inti session
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message
    || "internal server error");
});

app.listen(3000, () => {
  console.log("Listening on port 3001")
});
