module.exports = (app) => {
	const position = require('../controllers/position.controller.js')
	var router = require('express').Router()

	// Create a new Position
	router.post('/', position.create)

	// Retrieve all Position
	router.get('/', position.findAll)

	// Retrieve a single Position by id
	router.get('/:id', position.findOne)

	// Update a Position by id
	router.put('/:id', position.update)

	// Delete a Position by id
	router.delete('/:id', position.delete)

	app.use('/api/position', router)
}
