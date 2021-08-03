module.exports = (app) => {
	const employee = require('../controllers/employee.controller.js')
	var router = require('express').Router()

	// Create a new Employee
	router.post('/', employee.create)

	// Retrieve all Employee
	router.get('/', employee.findAll)

	// Retrieve a single Employee by id
	router.get('/:id', employee.findOne)

	// Update a Employee by id
	router.put('/:id', employee.update)

	// Delete a Employee by id
	router.delete('/:id', employee.delete)

	app.use('/api/employee', router)
}
