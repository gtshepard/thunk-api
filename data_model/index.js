require('dotenv').config();
const Sequelize = require('sequelize');
const Database = new Sequelize('postgres://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASS + '@localhost/' + process.env.DATABASE_NAME);
const UserModel = require('./UserModel.js');
const PostModel = require('./PostModel.js');
const CommentModel = require('./CommentModel.js');
//const HashTagModel = require('./HashTagModel.js');
//const PostHashTagModel = require('./PostHashTagModel.js');
//init data models
const User = UserModel(Sequelize, Database);
const Post = PostModel(Sequelize, Database);
const Comment = CommentModel(Sequelize, Database);
//const HashTag = HashTagModel(Sequelize, Database);
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
//HashTag.belongsToMany(Post, {through: PostHashTag});
//Post.belongsToMany(HashTag, {through: PostHashTag});

//connect to Database
Database.sync().then(() => {
   console.log("db and tables created");
});

module.exports = {
  User,
  Post,
  Comment
  //HashTag,
//  PostHashTag
}
