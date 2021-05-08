const jwt = require('jsonwebtoken')
const db = require('../models/index')
const JWT_SECRET = 'licentasecret'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_SECRET)

        const user = await db.Users.findOne({where: {id: decoded.id}})
        if (!user) {
            throw new Error()
        }
        
        const userTokens = user.tokens.split(',')

        const found = userTokens.find(utoken => utoken === token)

        if (!found) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
        
    } catch (err) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth