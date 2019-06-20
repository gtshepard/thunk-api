module.exports = (dataType, db) => {
  return db.define('user', {
      google_id: dataType.STRING,
      distance_radius: {
        type: dataType.DOUBLE,
        allowNull: false,
        defaultValue: 5
    }
  });
}
