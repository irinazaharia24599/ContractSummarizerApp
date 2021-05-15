const db = require('../models/index')
const fs = require("fs");
const Contracts = require('../models/Contracts');

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


const uploadContract = async (req, res) => {
    try {
        console.log(req.file);

        if (req.file == undefined) {
            return res.send('You must select a file.');
        }

        const contract = db.Contracts;
        
        contract.create({
            //userID: req.user.id,
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + '/uploads/' + req.file.filename
            ),
        }).then((file) => {
            fs.writeFileSync(
                __basedir + "/tmp/" + file.name,
                file.data
            );

            return res.send(file);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload contracts: ${error}`);
    }
};

module.exports = {
    listAllContracts,
    addContract,
    deleteContract,
    uploadContract
}