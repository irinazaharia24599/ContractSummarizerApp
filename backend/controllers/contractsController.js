const db = require('../models/index')
const fs = require("fs");
const Contracts = require('../models/Contracts');
const nearley = require("nearley");
const grammar = require("../gramatica/grammar2.js");
const mammoth = require("mammoth");
const filepreview = require('filepreview-dp');
const uuid = require('uuid').v4;

const listAllContracts = async (req, res) => {
    try {
        const contracts = await db.Contracts.findAll(
            {
                where: {
                    userID: req.params.id
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

        // if (contract.userID !== req.user.id) {
        //     return res.status(400).send({ error: "bad request" })
        // }

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

        if (req.file == undefined) {
            return res.send('You must select a file.');
        }

        const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

        var extractedText = new mammoth.extractRawText({ path: __basedir + '/uploads/' + req.file.filename })
            .then(function (result) {
                text = result.value
                return text
            })

        var parsedContract = async () => {
            parser.feed(await extractedText);
            console.log(parser.results[0])
            // return parser.results.join('')
            return parser.results[0]
        }

        // var contractThumbnail = uuid() + '.png';
        // var filePath = __basedir + '/uploads/' + req.file.filename;
        // var thumbnailPath = __basedir + '/thumbnails/' + contractThumbnail;
        // filepreview.generateAsync(filePath, thumbnailPath.toString).then( () => done() ).catch( error => done(error));

        db.Contracts.create({
            userID: req.params.id,
            name: req.file.originalname,
            encryptedName: req.file.filename,
            uploadDate: new Date().toLocaleDateString(),
            description: await parsedContract(),
            // thumbnail: contractThumbnail
            // type: req.file.mimetype,
            // data: fs.readFileSync(
            //     __basedir + '/uploads/' + req.file.filename
            // ),
        }).then((contract) => {
            console.log(contract.name)
            res.status(201).send({ contract })
        });


    } catch (error) {
        console.log(error);
        return res.send('Error when trying upload contracts: ${error}');
    }
}

const downloadContract = async (req, res) => {
    try {
        const contract = await db.Contracts.findByPk(req.params.id);

        if (!contract) {
            return res.status(404).send({
                status: 'Not found'
            })
        }
        var path = __basedir + '/uploads/' + contract.encryptedName;
        res.download(path, contract.name);

    } catch (error) {
        console.log(error);
        return res.send('Error when trying to download contract: ${error}');
    }

}

const getContractText = async (req, res) => {
    try {
        const contract = await db.Contracts.findByPk(req.params.id);

        if (!contract) {
            return res.status(404).send({
                status: 'Not found'
            })
        }

        var extractedText = new mammoth.extractRawText({ path: __basedir + '/uploads/' + contract.encryptedName })
            .then(function (result) {
                text = result.value
                return text
            })

        var text = await extractedText;
        res.send({ status: "OK", text });
    } catch (error) {
        console.log(error);
        return res.send('Error when trying to extract contract text: ${error}');
    }

}

module.exports = {
    listAllContracts,
    addContract,
    deleteContract,
    uploadContract,
    downloadContract,
    getContractText
}