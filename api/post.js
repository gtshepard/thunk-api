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

//get all posts
router.get('/', (req, res, next) => {
    Post.findAll().then((posts) => res.status(201).json(posts));
});

//get all posts made by a specific user
router.get('/user/:userid', (req, res, next) => {
    Post.findAll({where:{userId:[req.params.userid]}}).then((posts) => res.status(201).json(posts));
});

//get feed for a user (posts with in the location radius of the user)
router.get('/user/:id/:radius/:lat/:lng', (req, res, next) => {
  //55 clark st 40.697835, -73.993762
  //animoto  40.730876, -73.992002
  //wsq park 40.731091, -73.997318
  //nyu tish 40.729753, -73.993780
  //hunter college  40.768543, -73.964526
  //shanes 40.728273, -73.987688
  //boardwalk JShore: 40.393044, -74.013410
  function getMiles(i) {
    return i*0.000621371192;
  }

  Post.findAll({ order:[
            ['createdAt', 'DESC']
  ]}).then((posts) => posts.filter((e) => (req.params.radius > getMiles(geoSphere.computeDistanceBetween({lat:e.lattitude ,lng: e.longitude}, {lat: req.params.lat, lng: req.params.lng}))))).then((p) => res.status(201).json(p));
});

//get number of likes for a post
router.get('/likes/post/:id', accessProtectionMiddleware, (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    post.countLikes().then((post) => res.json(post))
  })
})

//get number of dislikes for a post
router.get('/dislikes/post/:id', accessProtectionMiddleware, (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    post.countDislikes().then((post) => res.json(post))
  })
})

//TODO: recycler view
//get all time best posts based on vote count.
router.get('/best', accessProtectionMiddleware, async (req, res, next) => {

    let postLikes = [];
    const allPosts = await Post.findAll()

    for (let i = 0; i < allPosts.length; i++) {
        const allLikes = {post: allPosts[i], count: await allPosts[i].countLikes() - await allPosts[i].countDislikes()}
        postLikes.push(allLikes);
    }

    const sortedPosts = postLikes.sort((a, b) => {return b.count - a.count})
    res.status(201).json(sortedPosts);
})

//get all time worst posts based on vote count.
router.get('/worst', async (req, res, next) => {

    let postLikes = [];
    const allPosts = await Post.findAll()

    for (let i = 0; i < allPosts.length; i++) {
        const allLikes = {post: allPosts[i], count: await allPosts[i].countLikes() - await allPosts[i].countDislikes()}
        postLikes.push(allLikes);
    }

    const sortedPosts = postLikes.sort((a, b) => {return a.count - b.count})
    res.status(201).json(sortedPosts);
})



//has user x liked post y
router.get('/disliked/:userid/:postid', async (req,res,next) => {
    const user = User.findByPk(req.params.userid)
    const post = Post.findByPk(req.params.postid)
    const dislikes = await post.getDislikes(user)

    for (let i = 0; i < likes.length; i++){
        if(dislikes[i].dislikes.userId === user.id){
          return res.status(201).json({disliked: True})
        }
      }

      return res.status(201).json({disliked: False})
})


//user likes a post TODO: make it so user can only lke post once
router.post('/likes/post/:postid/user/:userid', async (req, res, next) => {

  try {
    const post = await Post.findByPk(req.params.postid)
    const user = await User.findByPk(req.params.userid)
    const likes = await post.getLikes()
    console.log("LEN", likes.length)

    if(likes.length === 1){
      const like = await post.addLike(user)
      return res.status(201).json(like)
    }

    for (let i = 0; i < likes.length; i++){
        if(likes[i].likes.userId === user.id){
          await post.removeLike(user);
          return res.status(201).json({disliked:"False"})
        }
      }
      const like = await post.addLike(user)
      return res.status(201).json(like)

    } catch(err){
      console.log(err)
    }
})

//user Dislikes a post TODO: make it so user can only dislike post once
router.post('/dislikes/post/:postid/user/:userid', async (req, res, next) => {

  try {
    const post = await Post.findByPk(req.params.postid)
    const user = await User.findByPk(req.params.userid)
    const dislikes = await post.getDislikes()
    console.log("LEN", dislikes.length)

    if(dislikes.length === 1){
      const dislike = await post.addDislike(user)
      return res.status(201).json(dislike)
    }

    for (let i = 0; i < dislikes.length; i++){
        if(dislikes[i].dislikes.userId === user.id){
          await post.removeDislike(user);
          return res.status(201).json({disliked:"False"})
        }
      }
      const dislike = await post.addDislike(user)
      return res.status(201).json(dislike)

    } catch(err){
      console.log(err)
    }
})

//creates a post
router.post('/', async (req, res, next) => {
    Post.create(req.body).then((post) => res.status(201).json(post));
});

//update post by id
router.put('/:id', (req, res, next) => {
    Post.findByPk(req.params.id).then((post) => post.update(req.body)).then((updatedPost) => res.status(201).json(updatedPost));
});

//delete post by id
router.delete('/:id', (req, res, next) => {
    Post.destroy({
      where:{id: req.params.id}
    }).then((post) => res.status(201).json(post));
});
//TODO: add table of contents to
//TODO: report update value (many to many relationship)
//TODO: user account creation
//must be authenticated to use any endpoint
//TODO: trending tags  ()
//TODO: take in an array of tags
module.exports = router;
