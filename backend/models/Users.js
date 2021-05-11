const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('./index')
const JWT_SECRET = 'licentasecret'

const UserModel = function (sequelize, DataTypes) {
    let Users = sequelize.define('users', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(1000),
            allowNull: false
        },
        tokens: {
            type: DataTypes.STRING(1000),
            defaultValue: ''
        }
    })

    Users.prototype.generateAuthToken = async function () {
        const user = this
        const token = jwt.sign({ id: user.id.toString() }, JWT_SECRET)

        user.tokens = `${token}`
        // user.tokens += `${token},`

        await user.save()

        return token
    }

    Users.findByCredentials = async function (email, password) {
        const user = await Users.findOne({ where: { email } })

        if (!user) {
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
        }

        return user
    }

    return Users

}

module.exports = UserModel