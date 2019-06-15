const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');
/**
  router.get('/', (req, res) => {
     Student.findAll().then(students => res.json(students))
  });

  router.get('/:id', (req, res) => {
     Campus.findByPk(req.params.id).then((result) => res.status(201).json(result));
  });

  router.post('/', (req, res) =>{
    Student.create(req.body).then((result) => res.status(201).json(result));
  });

  router.put('/:id', (req, res) => {
      Student.findByPk(req.params.id).then((student) => student.update(req.body)).then((updatedStudent) => res.status(201).json(updatedStudent))
  });

  router.delete('/:id', (req, res) => {
      Student.destroy({
          where: { id: req.params.id }
      }).then(student => res.status(201).json(student));
  });
  **/

module.exports = router;
