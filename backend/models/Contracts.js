module.exports = function (sequelize, DataTypes) {
    let Contracts = sequelize.define('contracts', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING(2000),
        code: {
            type: DataTypes.STRING,
            unique: true
        },
        userID: DataTypes.INTEGER
    })
    return Contracts
}