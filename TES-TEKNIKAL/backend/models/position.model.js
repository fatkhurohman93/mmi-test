module.exports = (sequelize, Sequelize) => {
	const Position = sequelize.define(
		'position',
		{
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			code: {
				type: Sequelize.STRING,
			},
			name: {
				type: Sequelize.STRING,
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

	return Position
}
