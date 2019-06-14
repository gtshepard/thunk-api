module.exports = (dataType, db) => {
  return db.define('comment', {
        text: dataType.STRING,
        report: dataType.INTEGER,
        markOwner: dataType.BOOLEAN
    });
}
