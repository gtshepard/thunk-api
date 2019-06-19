const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = require('express').Router();
const {User} = require('../data_model/index');
const passport = require('passport');
require('dotenv').config();

router.get('/', passport.authenticate('google', {scope: 'email'}))

router.get('/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3000/',
    failureRedirect: '/'
}));

router.delete('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy((err) => {
    if (err) return next(err)
    res.status(204).end()
  })
})

const googleCredentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://thunk-api-19.herokuapp.com/api/v1/auth/google/callback'
}

const verificationCallback = async (token, refreshToken, profile,  done) => {
  const info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      imageUrl: profile.photos ? profile.photos[0].value : undefined
    }

  try {
    const [user] = await User.findOrCreate({
      where: {google_id: profile.id},
      defaults: info
    })
     done(null, user);
  } catch(err){
      done(err);
  }
}

const strategy = new GoogleStrategy(googleCredentials, verificationCallback);
passport.use(strategy);

module.exports = router
