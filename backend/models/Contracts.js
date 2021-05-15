module.exports = function (sequelize, DataTypes) {
    let Contracts = sequelize.define('contracts', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: DataTypes.BLOB('long'),
        type: DataTypes.STRING,
        description: DataTypes.STRING(2000),
        userID: DataTypes.INTEGER
    })

    return Contracts
}