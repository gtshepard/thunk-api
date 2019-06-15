const router = require('express').Router();
const userRouter = require('./user');
const postRouter = require('./post');
//const campusRouter = require('./campus');
const {User, Post, Comment} = require('../data_model/index');

router.use("/user", userRouter);
router.use("/post", postRouter);


module.exports = router;
