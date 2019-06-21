const router = require('express').Router();
const {User, Post, Comment, Tag} = require('../data_model/index');
const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user)
  } catch (err){
    done(err);
  }
});

const accessProtectionMiddleware = (req, res, next) => {
      if (req.isAuthenticated()){
        next()
      } else {
         res.status(403).json({
            message: 'must be logged in to continue'
         });
      }
}

//get all users
router.get('/', accessProtectionMiddleware,(req, res, next) => {
    User.findAll().then((users) => res.status(201).json(users));
});

//get user by id
router.get('/:userid', accessProtectionMiddleware, (req, res, next) => {
    User.findByPk(req.params.userid).then((user) => res.status(201).json(user));
});

//create a user
router.post('/', accessProtectionMiddleware,  (req, res, next) => {
    User.create(req.body).then((user) => res.status(201).json(user));
});

//user reports a post
router.post('/report/post/:postid/user/:userid', accessProtectionMiddleware, async (req, res, next) => {
  try {
    const postToReport = await Post.findByPk(req.params.postid)
    const userToReportPost = await User.findByPk(req.params.userid)
    const report = await postToReport.addUserReportPost(userToReportPost)
    res.status(201).json(report)
  } catch(err){
    console.log(err)
  }
})

//user reports a comment
router.post('/report/comment/:commentid/user/:userid', accessProtectionMiddleware,  async (req, res, next) => {
  try {
    const commentToReport = await Comment.findByPk(req.params.commentid)
    const userToReportComment = await User.findByPk(req.params.userid)
    const report = await commentToReport.addUserReportComment(userToReportComment)
    res.status(201).json(report)
  } catch(err){
    console.log(err)
  }
})

//update a user
router.put('/:id', accessProtectionMiddleware , (req, res, next) => {
    User.findByPk(req.params.id).then((user) => user.update(req.body)).then((updatedUser) => res.status(201).json(updatedUser));
});

//delete a user
router.delete('/:id', accessProtectionMiddleware , (req, res, next) => {
    User.destroy({
      where:{id: req.params.id}
    }).then((user) => res.status(201).json(user));
});

module.exports = router
