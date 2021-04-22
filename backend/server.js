// const express = require('express')
// const Sequelize = require('sequelize')
// //const db = require('./createdb')

// const app = express()
// app.use('/', express.static('../frontend'))
// //app.use('/createdb', db)
// app.listen(8080)

// const sequelize = new Sequelize('licenta', 'root', 'pass', {
//     dialect: "mysql",
//     host: "localhost"
// })

// sequelize.authenticate().then(() => {
//     console.log("Connected to database")
// }).catch(() => {
//     console.log("Unable to connect to database")
// })

// app.get('/createdb', (request, response) => {
//     sequelize.sync({force:true}).then(() => {
//         response.status(200).send('tables created')
//     }).catch((err) => {
//         console.log(err)
//         response.status(200).send('could not create tables')
//     })
// })

const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/', api)
// app.use('/', express.static('../frontend'))
// app.use('/api', api)



app.listen(8080, () => {
    console.log('Server ruleaza pe port 8080')
})