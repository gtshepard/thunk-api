module.exports = (dataType, db) => {
    db.define('Comment', {
        text: dataType.STRING,
        report: dataType.INTEGER,
        markOwner: dataType.BOOLEAN
    });
}
