const router = require('express').Router();
const userRouter = require('./user');
const postRouter = require('./post');
//const campusRouter = require('./campus');
const {User, Post, Comment} = require('../data_model/index');

//set up routes for student and campus interface files
//router.use("/students", studentRouter);
//router.use("/campuses", campusRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);


module.exports = router;
