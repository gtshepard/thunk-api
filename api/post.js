const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');

router.get('/', (req, res, next) => {
    Post.findAll().then((posts) => res.status(201).json(posts));
});

router.get('/user/:id', (req, res, next) => {

});

router.get('/:id', (req, res, next) => {
    Post.findByPk(req.params.id).then((post) => res.status(201).json(post));
});


router.post('/', (req, res, next) => {
    Post.create(req.body).then((post) => res.status(201).json(post));
});

router.put('/:id', (req, res, next) => {
    Post.findByPk(req.params.id).then((post) => post.update(req.body)).then((updatedPost) => res.status(201).json(updatedPost));
});

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
