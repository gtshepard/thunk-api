const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');
const geoSphere = require('spherical-geometry-js');


//get all posts
router.get('/', (req, res, next) => {
    Post.findAll().then((posts) => res.status(201).json(posts));
});
/**
//get all thoughts
router.get('/thought', async (req, res, next) => {
  let postLikes = [];
  try {
    const allPosts = await Post.findAll({order: [
      ['createdAt', 'DESC']
    ]})

    for (let i = 0; i < allPosts.length; i++) {

      const allLikes = {
        post: allPosts[i],
        comment: await Comment.findAll({where:{postId:[allPosts[i].id]}}),
        count: await allPosts[i].countLikes() - await allPosts[i].countDislikes()
      }
        //console.log("COMMENT:", allLikes.comment)
        //console.log("DATE:" , allLikes.post.createdAt)
        postLikes.push(allLikes);
    }

    //console.log("ARRRY:" , postLikes);
    //const sortedPosts = postLikes.sort((a, b) => {return a.count - b.count})
    res.status(201).json(postLikes);
  } catch (err){
      console.log(err);
  }
});

//get all thoughts made by a specific user
router.get('/thought/:id', async (req, res, next) => {
    let userThoughts = []

    try {

      const userPosts = await Post.findAll({
            where:{
              userId:[req.params.id]
            }
          //  order:[['createdAt', 'DESC']]
        })

        for(let i = 0; i < userPosts.length; i++) {

          const thought = {
            post: userPosts[i],
            comment: await Comment.findAll({where:{postId:[userPosts[i].id]}}),
            count: await allPosts[i].countLikes() - await userPosts[i].countDislikes(),
            tag: await userPosts[i].getTags()
          }
            console.log("USERTHOUGHTS" , userThoughts);
            userThoughts.push(thought);
        }
        res.status(201).json(userThoughts)
    } catch(err) {
      console.log(err)
    }
})
**/

//get all posts made by a specific user
router.get('/user/:userid', (req, res, next) => {
    Post.findAll({where:{userId:[req.params.id]}}).then((posts) => res.status(201).json(posts));
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
router.get('/likes/post/:id', (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    post.countLikes().then((post) => res.json(post))
  })
})




//get number of dislikes for a post
router.get('/dislikes/post/:id', (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    post.countDislikes().then((post) => res.json(post))
  })
})

//TODO: recycler view
//get all time best posts based on vote count.
router.get('/best', async (req, res, next) => {

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

//user likes a post TODO: make it so user can only lke post once
router.post('/likes/post/:postid/user/:userid', (req, res, next) => {
  Post.findByPk(req.params.postid).then((post) => {
    User.findByPk(req.params.userid).then(user => {
      post.addLike(user).then(like => res.json(like))
    })
  })
})

//user Dislikes a post TODO: make it so user can only dislike post once
router.post('/dislikes/post/:postid/user/:userid', (req, res, next) => {
  Post.findByPk(req.params.postid).then((post) => {
    User.findByPk(req.params.userid).then(user => {
      post.addDislike(user).then(like => res.json(like))
    })
  })
})

//creates a post
router.post('/', (req, res, next) => {
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

module.exports = router;
