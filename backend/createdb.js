let db = require('./models/index')
const bcrypt = require('bcryptjs')

db.sequelize.sync({ force: true }).then(async () => {
    console.log('tables created')

    let user = await db.Users.create({
        firstName: 'Irina',
        lastName: 'Zaharia',
        email: 'irinazahariaa@gmail.com',
        password: await bcrypt.hash('pas123', 8),
    })

    let contract = await db.Contracts.create({
        name: 'contract1.txt',
        description: 'descriere contract: contractanti, obiectul contractului etc',
        userID: user.id
    })

}).catch(err => {
    console.log('could not create tables')
})
