const router = require('express').Router();
//const studentRouter = require('./student');
//const campusRouter = require('./campus');
const {User, Post, Comment} = require('../data_model/index');

//set up routes for student and campus interface files
//router.use("/students", studentRouter);
//router.use("/campuses", campusRouter);

module.exports = router;
