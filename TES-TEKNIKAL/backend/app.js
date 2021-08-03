const express = require('express')
const app = express()
const cors = require('cors')
const path = __dirname + '/views/'

app.use(express.static(path))

const corsOptions = {
	origin: '*',
}

app.use(cors(corsOptions))

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

const db = require('./models')
db.sequelize.sync({ force: false })
require('./routes/position.route')(app)
require('./routes/employee.route')(app)

app.get('*', (req, res) => {
	//let url = req.url.slice(0, 4)
	res.sendFile(`${path}/index.html`)
	//res.status(404).send({ message: 'Not Found' })
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`)
})
