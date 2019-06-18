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
Database.sync().then(() => {
   console.log("db and tables created");
});

module.exports = {
  User,
  Post,
  Comment,
  Tag
//  PostHashTag
}
