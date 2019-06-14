module.exports = (dataType, db) => {
  return db.define('User', {
      google_id: dataType.STRING,
      distance_radius: dataType.DOUBLE
  });
}
