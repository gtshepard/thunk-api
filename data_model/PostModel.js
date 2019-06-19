module.exports = (dataType, db) => {
   return db.define('post', {
      text: dataType.STRING,
      lattitude: dataType.DOUBLE,
      longitude: dataType.DOUBLE,
      report: dataType.STRING
   });
}
