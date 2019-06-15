const router = require('express').Router();
const {User} = require('../data_model/index');

router.post('/', (req, res) => {
  User.create(req.body).then((result) => res.status(201).json(result));
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
