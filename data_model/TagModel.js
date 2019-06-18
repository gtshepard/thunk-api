module.exports = (dataType, db) => {
  return db.define('tag', {
      tag: dataType.STRING,
  });
}
