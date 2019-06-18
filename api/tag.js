const router = require('express').Router();
const {User, Post, Comment, Tag} = require('../data_model/index');

//get all hashtags for a post

router.post('/post/:id', (req, res, next) => {

  Post.findByPk(req.params.id).then((post) => {
  //   Tag.create(req.body).then((tag) => {
  //   console.log(Object.keys(Object.getPrototypeOf(tag)))
  //   console.log(Object.keys(Object.getPrototypeOf(post)))
  //   res.json(tag)
  // })
  post.createTag(req.body).then((post) => res.json(post))
  // res.json(post)

    // Tag.create(req.body).then((tag) => res.status(201).json(tag));
  })
});

/**router.post('/likes/post/:postid/user/:userid', (req, res, next) => {
    console.log(Object.keys(Object.getPrototypeOf(post)))
    res.send('Sucess')

})**/

router.post('/likes/post/:postId/user/:userId', (req,res,next) => {
  Post.findByPk(1).then(post => console.log(Object.keys(Object.getPrototypeOf(post))))

  res.send(`Hello foo ${req.params.postId}. How is the bar? ${req.params.userId}`)


})






//Tag.create(req.body).then((tag) => res.status(201).json(tag));

//Post.findByPk(req.params.id).then((post) => .then((post, tag) => post.addTags([tag])).then((tag) => res.status(201).json(tag));
//Post.findByPk(req.params.id).then(() => addTag({tag})).then((tag) => post.addTags(tag)).then((tag) => res.status(201).json(tag))
//const post = Post.findByPk(req.params.id);
//Tag.create({tag:req.body}).then(function(tag) {post.addTags([tag])});
//post.addTags([tag])
//  const t = Tag.create({tag: req.body});
//Post.findByPk(req.params.id).then((post) => {
//}).then((post) => res.status.json(post));

//Well, I solved the problem with setCoins, above. Apparently it takes id numbers and not objects, so this works:
/*Ledger.findById(22).then(ledger=>{
    ledger.setCoins([1,2]).then(sc=>{
        console.log(sc);
    });
});
*/


//Project.create({ id: 11 }).then(function (project) {
  //user.addProjects([project, 12]);
//});
/**models.User.find({ where: {first_name: 'john'} }).on('success', function(user) {
  models.City.find({where: {id: 10}}).on('success', function(city){
    user.setCities([city]);
  });
});
**/

module.exports = router
