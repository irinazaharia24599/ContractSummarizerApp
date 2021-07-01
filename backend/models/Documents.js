module.exports = function (sequelize, DataTypes) {
    let Documents = sequelize.define('documents', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        encryptedName: DataTypes.STRING,
        description: DataTypes.STRING(2000),
        userID: DataTypes.INTEGER,
        uploadDate: DataTypes.DATEONLY, 
        // thumbnail: DataTypes.STRING
    })

    return Documents
}