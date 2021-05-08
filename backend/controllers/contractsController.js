const db = require('../models/index')

const listAllContracts = async (req, res) => {
    try {
        const contracts = await db.Contracts.findAll(
            {
                where: {
                    userID: req.user.id
                }
            }
        )
        if (!contracts) {
            return res.status(204).send({
                status: 'No content'
            })
        }
        res.send({
            status: "OK",
            contracts
        })    
    } catch(err) {
        res.status(500).send({
            error: err
        })
    }
}

module.exports = {
    listAllContracts
}