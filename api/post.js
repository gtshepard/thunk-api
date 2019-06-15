const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');

router.get('/', (req, res, next) => {
    Post.findAll().then((posts) => res.status(201).json(posts));
});

router.get('/user/:id', (req, res, next) => {
    Post.findAll({where:{userId:[req.params.id]}}).then((posts) => res.status(201).json(posts));
});

// TODO: get post within location radius
router.get('/:id', (req, res, next) => {
    Post.findByPk(req.params.id).then((post) => res.status(201).json(post));
});

router.post('/', (req, res, next) => {
    Post.create(req.body).then((post) => res.status(201).json(post));
});

router.put('/:id', (req, res, next) => {
    Post.findByPk(req.params.id).then((post) => post.update(req.body)).then((updatedPost) => res.status(201).json(updatedPost));
});

module.exports = router;
