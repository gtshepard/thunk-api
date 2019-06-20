const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const router = require('express').Router();
const {User} = require('../data_model/index');
const passport = require('passport');
require('dotenv').config();
const {OAuth2Client} = require('google-auth-library');
//const client = new OAuth2Client(CLIENT_ID);
/**
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
}
verify().catch(console.error);
**/
router.get('/', passport.authenticate('google', {scope: 'email'}))

router.get('/me', (req, res, next) => {
  res.json(req.user || {})
})

router.get('/callback', passport.authenticate('google', {
    successRedirect: 'https://thunk-api-19.herokuapp.com/api/v1/auth/google/me',
    failureRedirect: 'https://github.com'
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
      where: {google_id: profile.id, distance_radius: 25},
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
