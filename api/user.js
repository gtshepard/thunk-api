const router = require('express').Router();
const {User, Post, Comment, Tag} = require('../data_model/index');
const passport = require('passport');



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
router.get('/', (req, res, next) => {
    User.findAll().then((users) => res.status(201).json(users));
});

//get user by id
router.get('/:userid', (req, res, next) => {
    User.findByPk(req.params.userid).then((user) => res.status(201).json(user));
});

//has user x liked post y
router.get('/liked/:userid/:postid', async (req,res,next) => {
    const user = User.findByPk(req.params.userid)
    const post = Post.findByPk(req.params.postid)
    const likes = await post.getLikes(user)
/**
    for (let i = 0; i < likes.length; i++){
        if(likes[i].likes.userId === user.id){
          return res.status(201).json({liked: True})
        }
      }
**/
      return res.status(201).json({liked: False})
})

//create a user
router.post('/', (req, res, next) => {
    User.create(req.body).then((user) => res.status(201).json(user));
});

//user reports a post
router.post('/report/post/:postid/user/:userid', async (req, res, next) => {
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
router.post('/report/comment/:commentid/user/:userid', async (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
    User.findByPk(req.params.id).then((user) => user.update(req.body)).then((updatedUser) => res.status(201).json(updatedUser));
});

//delete a user
router.delete('/:id', (req, res, next) => {
    User.destroy({
      where:{id: req.params.id}
    }).then((user) => res.status(201).json(user));
});

module.exports = router
