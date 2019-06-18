require('dotenv').config();
const Sequelize = require('sequelize');
const Database = new Sequelize('postgres://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASS + '@localhost/' + process.env.DATABASE_NAME);
const UserModel = require('./UserModel.js');
const PostModel = require('./PostModel.js');
const CommentModel = require('./CommentModel.js');
const TagModel = require('./TagModel.js');
//const PostHashTagModel = require('./PostHashTagModel.js');
//init data models
const User = UserModel(Sequelize, Database);
const Post = PostModel(Sequelize, Database);
const Comment = CommentModel(Sequelize, Database);
const Tag = TagModel(Sequelize, Database);
//const PostHashTag = PostHashTagModel(Sequelize, Database);
console.log(Post, User, Comment);

//user -> posts relationship 1 user has many  posts (1:N)
Post.belongsTo(User);
User.hasMany(Post);

//post -> comment relationship 1 post has many users (1:N)
Comment.belongsTo(Post);
Post.hasMany(Comment);

//user -> comment relationship 1 post has many users (1:N)
Comment.belongsTo(User);
User.hasMany(Comment);

//return user.addTodos([todo]) keep this in mind when making hashtag
//user.addProject(project, { through: { status: 'started' }}) somthing you would do in post req
Tag.belongsToMany(Post, {through: 'post_tags'});
Post.belongsToMany(Tag, {through: 'post_tags'});


//connect to Database
//Database.sync().then(() => {
  // console.log("db and tables created");


//});


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
      text: 'test post 1.1',
      downVote: 1,
      upVote: 2,
      lattitude: 40.697835,
      longitude: -73.993762,
      report: 1,
      userId: 1
    })
    await Post.create({
      text: 'test post 1.2',
      downVote: 5,
      upVote: 2,
      lattitude: 40.697835,
      longitude: -73.993762,
      report: 1,
      userId: 1
    })

    await Post.create({
      text: 'test post 2.1',
      downVote: 54,
      upVote: 100,
      lattitude: 40.730876,
      longitude: -73.992002,
      report: 1,
      userId: 2
    })

    await Post.create({
      text: 'test post 2.2',
      downVote: 4,
      upVote: 0,
      lattitude: 40.730876,
      longitude: -73.992002,
      report: 1,
      userId: 2
    })

    await Post.create({
      text: 'test post 2.3',
      downVote: 1,
      upVote: 60,
      lattitude: 40.730876,
      longitude: -73.992002,
      report: 1,
      userId: 2
    })

    await Post.create({
      text: 'test post 3.1',
      downVote: 1,
      upVote: 10,
      lattitude: 40.729753,
      longitude: -73.993780,
      report: 1,
      userId: 3
    })

    await Post.create({
      text: 'test post 4.1',
      downVote: 15,
      upVote: 1,
      lattitude:40.393044,
      longitude: -74.013410,
      report: 1,
      userId: 4
    })

    await Post.create({
      text: 'test post 4.2',
      downVote: 15,
      upVote: 1,
      lattitude:40.393044,
      longitude: -74.013410,
      report: 12,
      userId: 4
    })

    await Comment.create({
      text: 'user 4  on post 1 ',
      report: 10,
      markOwner: false,
      postId: 1,
      userId: 4
    })

    await Comment.create({
      text: 'user 2  on post 2 ',
      report: 10,
      markOwner: false,
      postId: 2,
      userId: 2
    })

    await Comment.create({
      text: 'user 1 on post 4',
      report: 10,
      markOwner: false,
      postId: 4,
      userId: 1
    })

    await Comment.create({
      text: 'user 2 on post 3',
      report: 10,
      markOwner: false,
      postId: 3,
      userId: 2
    })

    console.log(`
      Seed success!
    `)
    Database.close()
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
