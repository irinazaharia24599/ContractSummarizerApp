const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const cors = require('cors')

const app = express()

global.__basedir = __dirname

app.use(bodyParser.json())
app.use(cors())

//app.use('/', api)
//app.use('/', express.static('../frontend'))
app.use('/', api)

app.listen(8080, () => {
    console.log('Server ruleaza pe port 8080')
})