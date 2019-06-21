const router = require('express').Router();
const {User, Post, Comment, Tag} = require('../data_model/index');
let _ = require('lodash');

const accessProtectionMiddleware = (req, res, next) => {
      if (req.isAuthenticated()){
        next()
      } else {
         res.status(403).json({
            message: 'must be logged in to continue'
         });
      }
}
//get all tags
router.get('/', async (req, res, next) => {
    try {
      const tagsInOrderByName = await Tag.findAll({order: [['tag']]})
      res.status(201).json(tagsInOrderByName)
    } catch(err) {
      console.log(err)
    }
})
//get most used tags in order of frequen
router.get('/trending', async (req, res, next) => {

  try{
      const allTags = await Tag.findAll()
      let trendingTags = [];
      let allTagValues = allTags.map((e) => e.tag)
      let uniqueTagValues = _.uniq(allTagValues)
      uniqueTagValues.forEach(e => console.log(e))

      for (let i = 0; i <uniqueTagValues.length; i++){
        trendingTags.push(await Tag.findAndCountAll({where:{tag: uniqueTagValues[i]}}))
      }

      const sortedbyTrending = trendingTags.sort((a, b) => {return b.count - a.count})
      res.status(201).json(sortedbyTrending)

  } catch(err){
    console.log(err)
  }
})

//get all hashtags for a post
router.get('/post/:id', (req, res, next) => {
  console.log("GET POSTS BY TAG VALUE")
  Post.findByPk(req.params.id).then((post) => {
    post.getTags().then((post) => res.json(post))
  })
})

//get all thoughts that contain a specific tag
router.get('/thought/:tag', async (req, res, next) => {
  let postsWithThisTag = []
  try {
    const allTags = await Tag.findAll()

    for (let i = 0; i < allTags.length; i++){
      if ((await allTags[i].tag) === req.params.tag){
        postsWithThisTag.push(await allTags[i].getPosts())
      }
    }

  let thoughtsWithThisTag = []
  for (let i = 0; i < postsWithThisTag.length; i++) {
     let aPost = await Post.findByPk(postsWithThisTag[i][0].id)
     const thought = {
       user: await User.findByPk(aPost.userId),
       post: aPost,
       comment: await Comment.findAll({where:{postId:[aPost.id]}}),
       tag: await aPost.getTags(),
       vote: await aPost.countLikes() - await aPost.countDislikes()
    }
     thoughtsWithThisTag.push(thought)
  }
    res.status(201).json(thoughtsWithThisTag)
  } catch(err){
      console.log(err)
  }
})

//create a tag for a post
router.post('/post/:id', (req, res, next) => {
  Post.findByPk(req.params.id).then((post) => {
    post.createTag(req.body).then((post) => res.json(post))
  })
});

//add an group of tags to specific post
router.post('/group/post/:id', async (req, res, next) => {
    const postToTag = await Post.findByPk(req.params.id)
    let tags = req.body
    let tagsCreated = []
    for(let i = 0; i < tags.length; i++){
        tagsCreated.push(await postToTag.createTag(tags[i]))
    }
    res.status(201).json(tagsCreated)
})

module.exports = router
