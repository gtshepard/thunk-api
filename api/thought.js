const router = require('express').Router();
const {User, Post, Comment, Tag} = require('../data_model/index');
const geoSphere = require('spherical-geometry-js');

const accessProtectionMiddleware = (req, res, next) => {
      if (req.isAuthenticated()){
        next()
      } else {
         res.status(403).json({
            message: 'must be logged in to continue'
         });
      }
}

//get all thoughts
router.get('/', async (req, res, next) => {

  let allThoughts = [];
  try {
    const allPosts = await Post.findAll({order: [
      ['createdAt', 'DESC']
    ]})

    for (let i = 0; i < allPosts.length; i++) {
      let comments = await Comment.findAll({where:{postId:[allPosts[i].id]}})
      const thought = {
        user: await User.findByPk(allPosts[i].userId),
        post: allPosts[i],
        comment: await Comment.findAll({where:{postId:[allPosts[i].id]}}),
        vote: await allPosts[i].countLikes() - await allPosts[i].countDislikes(),
        tag: await allPosts[i].getTags(),
        postReports: await allPosts[i].countUserReportPost()
      }
        allThoughts.push(thought);
    }
      res.status(201).json(allThoughts);
  } catch (err){
      console.log(err);
  }
});


router.get('/best',  async (req, res, next) => {
    let allThoughts = [];
    try {

      const allPosts = await Post.findAll({
          order:[
            ['createdAt', 'DESC']
      ]})

      for (let i = 0; i < allPosts.length; i++) {
        const thought = {
          user: await User.findByPk(allPosts[i].userId),
          post: allPosts[i],
          comment: await Comment.findAll({where:{postId:[allPosts[i].id]}}),
          vote: await allPosts[i].countLikes() - await allPosts[i].countDislikes(),
          tag: await allPosts[i].getTags(),
          postReports: await allPosts[i].countUserReportPost()
        }
        allThoughts.push(thought);
      }
    } catch(err) {
      console.log(err)
    }

    const sortedPosts = allThoughts.sort((a, b) => {return b.vote - a.vote})
    res.status(201).json(sortedPosts);
})

router.get('/worst', async (req, res, next) => {
  let allThoughts = [];
  try {
    const allPosts = await Post.findAll({
        order:[
          ['createdAt', 'DESC']
    ]})

    for (let i = 0; i < allPosts.length; i++) {
      const thought = {
        user: await User.findByPk(allPosts[i].userId),
        post: allPosts[i],
        comment: await Comment.findAll({where:{postId:[allPosts[i].id]}}),
        vote: await allPosts[i].countLikes() - await allPosts[i].countDislikes(),
        tag: await allPosts[i].getTags(),
        postReports: await allPosts[i].countUserReportPost()
      }
      allThoughts.push(thought);
    }
  } catch(err) {
    console.log(err)
  }
    const sortedPosts = allThoughts.sort((a, b) => {return a.vote - b.vote})
    res.status(201).json(sortedPosts);
})


router.get('/:thoughtid', async (req, res, next) => {
  try {
      const post = await Post.findByPk(req.params.thoughtid)
      let comments = await Comment.findAll({where:{postId:[post.id]}})
      const thought = {
          user: await User.findByPk(post.userId),
          post: post,
          comment: await Comment.findAll({where:{postId:[post.id]}}),
          vote: await post.countLikes() - await post.countDislikes(),
          tag: await post.getTags(),
          postReports: await post.countUserReportPost()
      }
      res.status(201).json(thought);
   } catch (err){
      console.log(err);
   }
});


//map each item from comment -> {comment, report}

//get all thoughts made by a specific user
router.get('/user/:userid', async (req, res, next) => {
    let userThoughts = []

    try {
      const userPosts = await Post.findAll({
            where:{
              userId:[req.params.userid]
            },
           order:[['createdAt', 'DESC']]
        })

        for(let i = 0; i < userPosts.length; i++) {
          const thought = {
            user: await User.findByPk(userPosts[i].userId),
            post: userPosts[i],
            comment: await Comment.findAll({where:{postId:[userPosts[i].id]}}),
            vote: await userPosts[i].countLikes() - await userPosts[i].countDislikes(),
            tag: await userPosts[i].getTags(),
            postReports: await userPosts[i].countUserReportPost()
          }
            userThoughts.push(thought);
        }
        res.status(201).json(userThoughts)
    } catch(err) {
      console.log(err)
    }
})

router.get('/user/:id/:radius/:lat/:lng', async (req, res, next) => {

    function getMiles(i) {
      return i*0.000621371192;
    }

    let thoughtsInUserLocation = []

    try {
        const postsbyMostRecent = await Post.findAll({
            order:[
              ['createdAt', 'DESC']
        ]})
        //get all posts within the distance radius of the user (maintains order)
        postsInUserLocation = postsbyMostRecent.filter((post) =>(req.params.radius > getMiles(geoSphere.computeDistanceBetween({lat: post.lattitude ,lng: post.longitude},{lat: req.params.lat, lng: req.params.lng}))))

        for(let i = 0; i < postsInUserLocation.length; i++) {
          const thought = {
            user: await User.findByPk(postsInUserLocation[i].userId),
            post: postsInUserLocation[i],
            comment: await Comment.findAll({where:{postId:[postsInUserLocation[i].id]}}),
            vote: await postsInUserLocation[i].countLikes() - await postsInUserLocation[i].countDislikes(),
            tag: await postsInUserLocation[i].getTags(),
            postReports: await postsInUserLocation[i].countUserReportPost()
          }
          thoughtsInUserLocation.push(thought);
        }
        res.status(201).json(thoughtsInUserLocation)
      } catch(err){
        console.log(err)
      }
})



module.exports = router
