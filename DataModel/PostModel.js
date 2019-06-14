module.exports = (dataType, db) => {
   return db.define('post', {
      text: dataType.STRING,
      downVote: dataType.INTEGER,
      upVote: dataType.INTEGER,
      lattitude: dataType.DOUBLE,
      longitude: dataType.DOUBLE,
      report: dataType.STRING,
      hashTag: dataType.STRING
   });
}
