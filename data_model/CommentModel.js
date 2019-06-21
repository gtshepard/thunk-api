module.exports = (dataType, db) => {
  return db.define('comment', {
        text: dataType.STRING,
         markOwner: {
           type: dataType.BOOLEAN,
           allowNull: false,
           defaultValue: false
          }
    });
}
