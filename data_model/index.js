require('dotenv').config();
const Sequelize = require('sequelize');
//const Database = new Sequelize('postgres://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASS + '@localhost/' + process.env.DATABASE_NAME);
const Database = new Sequelize(process.env.DATABASE_URL);
const UserModel = require('./UserModel.js');
const PostModel = require('./PostModel.js');
const CommentModel = require('./CommentModel.js');
const TagModel = require('./TagModel.js');

//init data models
const User = UserModel(Sequelize, Database);
const Post = PostModel(Sequelize, Database);
const Comment = CommentModel(Sequelize, Database);
const Tag = TagModel(Sequelize, Database);

//user -> posts relationship 1 user has many  posts (1:N)
Post.belongsTo(User);
User.hasMany(Post);
//post -> comment relationship 1 post has many users (1:N)
Comment.belongsTo(Post);
Post.hasMany(Comment);
//user -> comment relationship 1 post has many users (1:N)
Comment.belongsTo(User);
User.hasMany(Comment);
// tag -> psot relationship many Tags belong to many posts (N:M)
Tag.belongsToMany(Post, {through: 'post_tags'});
// post  -> tag relationship many posts belong to many tags (N:M)
Post.belongsToMany(Tag, {through: 'post_tags'});
// user likes post relationship many users like to many posts (N:M)
User.belongsToMany(Post, {as: 'Likes', through: 'likes'});
// post are liked by users  relationship many posts liked  by users (N:M)
Post.belongsToMany(User, {as: 'Likes', through: 'likes'});
// user dislikes post relationship many users dislike to many posts (N:M)
User.belongsToMany(Post, {as: 'Dislikes', through: 'dislikes'});
// post are disliked by users  relationship many posts disliked  by users (N:M)
Post.belongsToMany(User, {as: 'Dislikes', through: 'dislikes'});


const seed = async () => {
  try {
    await Database.sync({force: true})

    await User.create({
      google_id: 'AAA',
      distance_radius: '45.0'
    })

    await User.create({
      google_id: 'BBB',
      distance_radius: '1.0'
    })

    await User.create({
      google_id: 'CCC',
      distance_radius: '3.0'
    })

    await User.create({
      google_id: 'DDD',
      distance_radius: '33.0'
    })


    await Post.create({
      text: 'pizza for luch',
      downVote: 1,
      upVote: 2,
      lattitude: 40.697835,
      longitude: -73.993762,
      report: 1,
      userId: 1
    })
    await Post.create({
      text: 'concert feat. the weeknd this sunday!',
      downVote: 5,
      upVote: 2,
      lattitude: 40.697835,
      longitude: -73.993762,
      report: 1,
      userId: 1
    })

    await Post.create({
      text: 'my first time in new york wasssup?',
      downVote: 54,
      upVote: 100,
      lattitude: 40.730876,
      longitude: -73.992002,
      report: 1,
      userId: 2
    })

    await Post.create({
      text: 'why is the sky blue?',
      downVote: 4,
      upVote: 0,
      lattitude: 40.730876,
      longitude: -73.992002,
      report: 1,
      userId: 2
    })

    await Post.create({
      text: 'to think is to know, to know is to think',
      downVote: 1,
      upVote: 60,
      lattitude: 40.730876,
      longitude: -73.992002,
      report: 1,
      userId: 2
    })

    await Post.create({
      text: 'were hot dogs named after dogs, or were dogs named after hot dogs',
      downVote: 1,
      upVote: 10,
      lattitude: 40.729753,
      longitude: -73.993780,
      report: 1,
      userId: 3
    })

    await Post.create({
      text: 'why is 1 + 1 = 2 and not 11',
      downVote: 15,
      upVote: 1,
      lattitude:40.393044,
      longitude: -74.013410,
      report: 1,
      userId: 4
    })

    await Post.create({
      text: 'my posts are da bomb',
      downVote: 15,
      upVote: 1,
      lattitude:40.393044,
      longitude: -74.013410,
      report: 12,
      userId: 4
    })

    //load comments
    await Comment.create({
      text: 'i never run out of things to post, lookes like you did',
      report: 10,
      markOwner: false,
      postId: 1,
      userId: 4
    })

    await Comment.create({
      text: 'lame.... ',
      report: 10,
      markOwner: false,
      postId: 2,
      userId: 2
    })

    await Comment.create({
      text: 'YASSSSSSSSS',
      report: 10,
      markOwner: false,
      postId: 4,
      userId: 1
    })

    await Comment.create({
      text: 'get it',
      report: 10,
      markOwner: false,
      postId: 3,
      userId: 2
    })

    //load tags
    const postToTag1 = await Post.findByPk(1)
    await postToTag1.createTag({
        tag: 'pizza'
    })

    const postToTag2 = await Post.findByPk(1)
    await postToTag2.createTag({
        tag: 'lunch'
    })
    const postToTag3 = await Post.findByPk(1)
    await postToTag3.createTag({
        tag: 'cheatday'
    })

    const postToTag4 = await Post.findByPk(2)
    await postToTag4.createTag({
        tag: 'sundayfunday'
    })

    const postToTag5= await Post.findByPk(2)
    await postToTag5.createTag({
        tag: 'theweeknd'
    })

    const postToTag6 = await Post.findByPk(3)
    await postToTag6.createTag({
        tag: 'myfirsttime'
    })

    //users liking posts
    const postToLike1 = await Post.findByPk(1)
    const userToLikePost1 = await User.findByPk(1)
    await postToLike1.addLike(userToLikePost1)

    const postToLike2 = await Post.findByPk(1)
    const userToLikePost2 = await User.findByPk(2)
    await postToLike2.addLike(userToLikePost2)

    const postToLike3 = await Post.findByPk(2)
    const userToLikePost3 = await User.findByPk(1)
    await postToLike3.addLike(userToLikePost3)

    const postToLike4 = await Post.findByPk(3)
    const userToLikePost4 = await User.findByPk(3)
    await postToLike4.addLike(userToLikePost4)

    const postToDislike1 = await Post.findByPk(3)
    const userToDislikePost1 = await User.findByPk(3)
    await postToDislike1.addDislike(userToDislikePost1)

    const postToDislike2 = await Post.findByPk(1)
    const userToDislikePost2 = await User.findByPk(4)
    await postToDislike2.addDislike(userToDislikePost2)

    const postToDislike3 = await Post.findByPk(2)
    const userToDislikePost3 = await User.findByPk(4)
    await postToDislike3.addDislike(userToDislikePost3)

    console.log(`
      Seed success!
    `);

  } catch (err) {
    console.error(`
      Oh noes!
    `)
    console.error(err.stack)
    Database.close()
  }
}
seed()

module.exports = {
  User,
  Post,
  Comment,
  Tag
//  PostHashTag
}
