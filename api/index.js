const router = require('express').Router();
const userRouter = require('./user');
const postRouter = require('./post');
const authRouter = require('../auth/oauth');
const commentRouter = require('./comment');
const tagRouter = require('./tag');
const thoughtRouter = require('./thought')
const {User, Post, Comment, Tag} = require('../data_model/index');

router.use("/auth/google", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/tag", tagRouter);
router.use("/thought", thoughtRouter);

module.exports = router;
