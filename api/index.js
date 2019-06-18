const router = require('express').Router();
const userRouter = require('./user');
const postRouter = require('./post');
const commentRouter = require('./comment');
const {User, Post, Comment} = require('../data_model/index');

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);


module.exports = router;
