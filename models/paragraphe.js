module.exports = function (sequelize, DataTypes) {
    var Paragraphe = sequelize.define('paragraphe', {
        id: {
            type:DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        ordre: DataTypes.INTEGER,
        contenu: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function (models) {
                Paragraphe.belongsTo(models.article, {});
            }
        }
    });

    return Paragraphe;
};
