const router = require('express').Router();
const {User, Post, Comment} = require('../data_model/index');
const geoSphere = require('spherical-geometry-js');

//router.get('/', (req, res, next) => {
  //  Post.findAll().then((posts) => res.status(201).json(posts));
//});

//get all posts made by a specific user
router.get('/user/:id', (req, res, next) => {
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

//get all posts for a hastag order by most recent creation date
/**router.get('/:hashTag', (req, res, next) => {
    Post.findAll({where: {
        hashTag: [req.params.hashTag]
    }}).then((posts) => res.status(201).json(posts));
});**/

//get posts with highest votes, order by DESC upVotes
/**router.get('/', (req, res, next) => {
    Post.findAll({order:[
            ['upVote', 'DESC']
    ]}).then((posts) => res.status(201).json(posts));
});**/


//post with lowest down votes order by DESC down votes
/**
router.get('/', (req, res, next) => {
    Post.findAll({order:[
            ['downVote']
    ]}).then((posts) => res.status(201).json(posts));
});
**/

//get trending hash tags (used the most)
/**router.get('/trending/hashTag', (req, res, next) => {

});**/
//get number of likes for a post
router.get('/likes/post/:id', (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    post.countLikes().then((post) => res.json(post))
  })
})


//get the best posts based on likes.
router.get('/', async (req, res, next) => {
    let postLikes = [];

    const allPosts = await Post.findAll()
      //console.log(allPosts.length)
      //res.send(`${allPosts.length}`)
      for (let i = 0; i < allPosts.length; i++) {
        console.log("ME");
        //  allPosts[i].countLikes().then((likes) => {postLikes.push(likes)}).then((likes) => res.status(201).json(likes))
        const allLikes = {post: allPosts[i], count: await allPosts[i].countLikes()}
        postLikes.push(allLikes);
      //  .then((likeCount) => {postLikes.push(likeCount)});
      }
      const sortedPosts = postLikes.sort((a, b) => {return b.count - a.count})
      res.status(201).json(sortedPosts);
  //  }).then((allLikeCounts) => res.status(201).json(allLikeCounts));
})

router.post('/likes/post/:postid/user/:userid', (req, res, next) => {
  Post.findByPk(req.params.postid).then((post) => {
    console.log("POST" , post.id);
    // console.log(post);
    // post.addLike([post]).then((post) => res.json(post))
    User.findByPk(req.params.userid).then(user => {
      post.addLike(user).then(like => res.json(like))
    })
  })
})

// TODO: get posts by hashtag, also count the posts.
router.post('/', (req, res, next) => {
    Post.create(req.body).then((post) => res.status(201).json(post));
});

router.put('/:id', (req, res, next) => {
    Post.findByPk(req.params.id).then((post) => post.update(req.body)).then((updatedPost) => res.status(201).json(updatedPost));
});

router.delete('/:id', (req, res, next) => {
    Post.destroy({
      where:{id: req.params.id}
    }).then((post) => res.status(201).json(post));
});



/**router.delete('/:id', (req, res, next) => {

});**/

module.exports = router;
