module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define(
		'employee',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
			},
			birth_date: {
				type: Sequelize.DATEONLY,
			},
			position_id: {
				type: Sequelize.INTEGER,
				foreignKey: true,
			},
			id_number: {
				type: Sequelize.INTEGER,
				unique: true,
			},
			gender: {
				type: Sequelize.INTEGER,
			},
			is_delete: {
				type: Sequelize.BOOLEAN,
			},
		},
		{
			freezeTableName: true,
			timestamps: false,
		}
	)

	return Employee
}
