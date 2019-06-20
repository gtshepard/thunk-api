module.exports = (dataType, db) => {
  return db.define('comment', {
        text: dataType.STRING,
        markOwner: dataType.BOOLEAN
    });
}
