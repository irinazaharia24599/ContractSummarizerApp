const db = require('../models/index')

const listAllContracts = async (req, res) => {
    try {
        const contracts = await db.Contracts.findAll(
            {
                where: {
                    userID: req.params.id
                }
                // include:
                //     [
                //         {
                //             model: db.Users,
                //             where: {
                //                 userID: req.params.id
                //             }
                //         }
                //     ]
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
    } catch (err) {
        res.status(500).send({
            error: err
        })
    }
}

const addContract = async (req, res) => {
    try {

        const contract = req.body
        contract.userID = req.user.id

        await db.Contracts.create(contract)

        // const contract = new Contract({
        //     ...req.body,
        //     userID: req.user.userID 
        // })

        await db.Contracts.create(contract)
        res.status(201).send({
            status: "created",
            contract
        })
    } catch (err) {
        res.status(500).send({
            error: "Server error"
        })
    }
}

const deleteContract = async (req, res) => {
    try {
        const contract = await db.Contracts.findByPk(req.params.id)
        if (!contract) {
            return res.status(404).send({
                status: 'Not found'
            })
        }

        if (contract.userID !== req.user.id) {
            return res.status(400).send({ error: "bad request" })
        }

        await contract.destroy()
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
    listAllContracts,
    addContract,
    deleteContract
}