module.exports = function (sequelize, DataTypes) {
    let Contracts = sequelize.define('contracts', {
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

    return Contracts
}