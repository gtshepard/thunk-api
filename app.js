const express = require('express');
const app = express();
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const {User, Post, Comment, Tag} = require('./data_model/index');
const PORT = process.env.PORT
require('dotenv').config();

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};





//logging middleware
app.use(morgan('dev'));
//body parsing middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

//allow cross domain
app.use(allowCrossDomain);

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//inti session
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user)
  } catch (err){
    done(err);
  }
});



/**
app.get('/google2f484170efc3e9f0.html', (req, res, next) => {
    res.send('google-site-verification: google2f484170efc3e9f0.html')
})
**/
app.use("/api/v1", apiRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message
    || "internal server error");
});

app.listen(PORT, () => {
  console.log("Listening on port 3000")
});
