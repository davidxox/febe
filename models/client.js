module.exports = function (sequelize, DataTypes) {
    var Article = sequelize.define('Article', {
        id: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        titre: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Article.hasMany(models.paragraphe, {});
            }
        }
    });

    return Article;
};
