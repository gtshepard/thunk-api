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




module.exports = router;
