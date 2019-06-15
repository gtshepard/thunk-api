const router = require('express').Router();
const {User} = require('../data_model/index');

router.get('/', (req, res, next) => {
    User.findAll().then((users) => res.status(201).json(users));
});

router.get('/:id', (req, res, next) => {
    User.findByPk(req.params.id).then((user) => res.status(201).json(user));
});

//router.get('/:id/posts', (req, res, next) => {
  //  User.findByPk(req.params.id).then( user => Post.findAll())
//});

router.post('/', (req, res, next) => {
    User.create(req.body).then((user) => res.status(201).json(user));
});

router.put('/:id', (req, res, next) => {
    User.findByPk(req.params.id).then((user) => user.update(req.body)).then((updatedUser) => res.status(201).json(updatedUser));
});
/**
  router.get('/', (req, res) => {
    Campus.findAll().then(campuses => res.json(campuses))
  });

  router.get('/:id', (req, res, next) => {
     Campus.findByPk(req.params.id).then((result) => res.status(201).json(result));
  });

  router.post('/', (req, res) =>{
    Campus.create(req.body).then((result) => res.status(201).json(result));
  });

  router.put('/:id', (req, res) => {
      Campus.findByPk(req.params.id).then((campus) => campus.update(req.body)).then((updatedCampus) => res.status(201).json(updatedCampus))
  });

  router.delete('/:id', (req, res) => {
    Campus.destroy({
        where: { id: req.params.id }
    }).then(campus => res.status(201).json(campus));
  });
**/
module.exports = router
