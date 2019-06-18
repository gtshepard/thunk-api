const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');

//get all comments
router.get('/', (req, res, next) => {
    Comment.findAll().then((comment) => res.status(201).json(comment));
});

//get all comments for a specific post
router.get('/post/:id', (req, res, next) => {
  Comment.findAll({where:{postId:[req.params.id]}}).then((comment) => res.status(201).json(comment));
});

//get all comments for a specific user
router.get('/user/:id', (req, res, next) => {
  Comment.findAll({where:{userId:[req.params.id]}}).then((comment) => res.status(201).json(comment));
});

//create a comment
router.post('/', (req, res, next) => {
    Comment.create(req.body).then((comment) => res.status(201).json(comment));
});

//update a comment (remember all attirbutes must be included for put to work )
router.put('/:id', (req, res, next) => {
    Comment.findByPk(req.params.id).then((comment) => comment.update(req.body)).then((updatedComment) => res.status(201).json(updatedComment));
});

//delete a comment
router.delete('/:id', (req, res, next) => {
    Comment.destroy({
      where:{id: req.params.id}
    }).then((comment) => res.status(201).json(comment));
});

module.exports = router;
