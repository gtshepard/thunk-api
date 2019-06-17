const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');

//get all comments for a post
router.get('/post/id:', (req, res, next) => {
    Comment.findAll({
        where:{postId: req.params.id}
    }).then((comment) => res.status(201).json(comment));
});



router.post('/', (req, res, next) => {
    Comment.create()
});




module.exports = router;
