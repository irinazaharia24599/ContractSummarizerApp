module.exports = function (sequelize, DataTypes) {
    let Contracts = sequelize.define('contracts', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING(2000),
        userID: DataTypes.INTEGER
    })
    return Contracts
}