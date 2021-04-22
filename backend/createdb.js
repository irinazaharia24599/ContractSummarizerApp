let db = require('./models/index')
const bcrypt = require('bcryptjs')

db.sequelize.sync({ force: true }).then(async () => {
    console.log('tables created')

    let user = await db.Users.create({
        firstName: 'Maria',
        lastName: 'Popescu',
        email: 'mariapopescu@gmail.com',
        password: await bcrypt.hash('parola', 8),
    })

    let contract = await db.Contracts.create({
        name: 'contract 1',
        description: 'descriere contract: contractanti, obiectul contractului etc',
        code: 'a1b2c3',
        userID: user.id

    })

}).catch(err => {
    console.log('could not create tables')
})
