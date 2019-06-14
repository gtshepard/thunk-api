const Sequelize = require('sequelize');
const Database = new Sequelize('postgres://Garrison:gts092894@localhost/thunk');
const UserModel = require('./UserModel.js');
const PostModel = require('./PostModel.js');
const CommentModel = require('./CommentModel.js');

//init data models
const User = UserModel(Sequelize, Database);
const Post = PostModel(Sequelize, Database);
const Comment = CommentModel(Sequelize, Database);
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

//connect to Database
Database.sync().then(() => {
   console.log("db and tables created");
});

module.exports = {
  User,
  Post,
  Comment
}
