module.exports = (dataType, db) => {
  return db.define('user', {
      googleId: dataType.STRING,
      distanceRadius: dataType.DOUBLE
  });
}
