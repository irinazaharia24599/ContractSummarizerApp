const Sequelize = require('sequelize');
const db = {};
//const dbConfig = require('../config/db.json')

const sequelize = new Sequelize('licenta', 'root', 'pass', {
    dialect: 'mysql',
    host: "127.0.0.1",
    logging: false,
    define: {
        timestamps: false
    }
})

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = require('./Users')(sequelize, Sequelize);
db.Contracts = require('./Contracts')(sequelize, Sequelize);
db.Documents = require('./Documents')(sequelize, Sequelize);

db.Users.hasMany(db.Contracts, { foreignKey: "userID" });
db.Contracts.belongsTo(db.Users);

db.Users.hasMany(db.Documents, { foreignKey: "userID" });
db.Documents.belongsTo(db.Users);

module.exports = db;