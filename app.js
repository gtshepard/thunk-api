const express = require('express');
const app = express();
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT

require('dotenv').config();
//logging middleware
app.use(morgan('dev'));

//body parsing middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//inti session
app.use(passport.initialize());
app.use(passport.session());

app.get('google2f484170efc3e9f0.html', (req, res, next) => {
    res.send('google2f484170efc3e9f0.html')
})
app.use("/api/v1", apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message
    || "internal server error");
});

app.listen(PORT, () => {
  console.log("Listening on port 3000")
});
