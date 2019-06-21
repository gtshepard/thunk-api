const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');

const accessProtectionMiddleware = (req, res, next) => {
      if (req.isAuthenticated()){
        next()
      } else {
         res.status(403).json({
            message: 'must be logged in to continue'
         });
      }
}



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

//get all reports for a comment
router.get('/report/:commentid', async (req, res, next) => {
  try{
    const comment = await Comment.findByPk(req.params.commentid)
    res.status(201).json(await comment.countUserReportComment())
  } catch (err){
    console.log(err)
  }
})
//create a comment
router.post('/', (req, res, next) => {
    Comment.create(req.body).then((comment) => res.status(201).json(comment));
});

//update a comment by id (remember all attirbutes must be included for put to work )
router.put('/:id', (req, res, next) => {
    Comment.findByPk(req.params.id).then((comment) => comment.update(req.body)).then((updatedComment) => res.status(201).json(updatedComment));
});

//delete a comment by id
router.delete('/:id', accessProtectionMiddleware, (req, res, next) => {
    Comment.destroy({
      where:{id: req.params.id}
    }).then((comment) => res.status(201).json(comment));
});

module.exports = router;
