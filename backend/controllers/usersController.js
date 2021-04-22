const db = require('../models/index')
const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
    try {
        const tempUser = req.body
        tempUser.password = await bcrypt.hash(tempUser.password, 8)
        const user = await db.Users.create(tempUser)
        const token = await user.generateAuthToken()
        res.status(201).send({
            status: "created",
            user,
            token
        })
    } catch (err) {
        res.status(500).send({
            error: err
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await db.Users.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (err) {
        res.status(404).send({ error: "not found" })
    }
}

const logoutUser = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.split(',').filter(token => token != req.token).join()

        await req.user.save()
        res.send()

    } catch (err) {
        res.status(500).send({ error: 'server error' })
    }
}

const listAllUsers = async (req, res) => {
    try {
        const users = await db.Users.findAll()
        if (!users) {
            return res.status(204).send({
                status: 'No content'
            })
        }
        res.send({
            status: "OK",
            users
        })
    } catch (err) {
        res.status(500).send({
            error: err
        })
    }

}

const findUserById = async (req, res) => {
    res.send(req.user)
}


const updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const isNotValid = updates.find(key => {
            return key !== 'password'
        })

        if (isNotValid) {
            return res.status(400).send({ error: "invalid updates" })
        }

        const newPassword = await bcrypt.hash(req.body.password, 8)
        req.user.password = newPassword

        await req.user.save({ fields: ['password'] })
        res.send({
            status: "OK"
        })
    } catch (err) {
        res.status(500).send({
            error: 'Server error'
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        await req.user.destroy()
        res.send({
            status: "OK"
        })
    } catch (err) {
        res.status(500).send({
            error: "Server error"
        })
    }
}

module.exports = {
    listAllUsers,
    loginUser,
    logoutUser,
    findUserById,
    registerUser,
    updateUser,
    deleteUser
}