const dbConfig = require('../configs/db.config.js')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	dialectOptions: {
		multipleStatements: true,
	},
	operatorsAliases: 0,
	logging: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.position = require('./position.model.js')(sequelize, Sequelize)
db.employee = require('./employee.model.js')(sequelize, Sequelize)
db.employee.belongsTo(db.position, { foreignKey: 'position_id' })

module.exports = db
