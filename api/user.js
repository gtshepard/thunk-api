const router = require('express').Router();
const {User} = require('../data_model/index');
const passport = require('passport');

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

//get all users
router.get('/', (req, res, next) => {
    User.findAll().then((users) => res.status(201).json(users));
});

//get user by id
router.get('/:userid', (req, res, next) => {
    User.findByPk(req.params.userid).then((user) => res.status(201).json(user));
});

//create a user
router.post('/', (req, res, next) => {
    User.create(req.body).then((user) => res.status(201).json(user));
});

//update a user
router.put('/:id', (req, res, next) => {
    User.findByPk(req.params.id).then((user) => user.update(req.body)).then((updatedUser) => res.status(201).json(updatedUser));
});

//delete a user
router.delete('/:id', (req, res, next) => {
    User.destroy({
      where:{id: req.params.id}
    }).then((user) => res.status(201).json(user));
});

module.exports = router
