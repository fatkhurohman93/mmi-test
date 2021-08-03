const db = require('../models')
const Employee = db.employee
const { and, literal, Op } = db.Sequelize

const getPagination = (page, size) => {
	const limit = size ? +size : 10
	const offset = page ? page * limit : 0

	return { limit, offset }
}

const getPagingData = (Data, page, limit) => {
	const { count: totalData, rows: data } = Data
	const currentPage = page ? +page : 0
	const totalPages = Math.ceil(totalData / limit)

	return { totalData, data, totalPages, currentPage }
}

exports.create = (req, res) => {
	const { name, birth_date, position_id, id_number, gender, is_delete } =
		req.body.data

	if (
		!name ||
		!birth_date ||
		!position_id ||
		!id_number ||
		!gender ||
		is_delete === undefined
	) {
		return res.status(500).send({ message: 'Field tidak boleh kosong!' })
	}
	Employee.create({
		name: name,
		birth_date: birth_date,
		position_id: position_id,
		id_number: id_number,
		gender: gender,
		is_delete: is_delete,
	})
		.then((response) => {
			res.send(response)
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message ? err.message : 'Terjadi Kesalahan' })
		})
}

exports.findAll = (req, res) => {
	const {
		page,
		size,
		name,
		sortByName,
		sortByBirthDate,
		sortByPositionName,
		sortByNIP,
		sortByGender,
	} = req.query
	let searchByName = name ? { name: { [Op.like]: `%${name}%` } } : null
	const { limit, offset } = getPagination(page, size)
	const orderBy = []
	if (sortByName) {
		orderBy.push(['name', sortByName == 1 ? 'asc' : 'desc'])
	}
	if (sortByBirthDate) {
		orderBy.push(['birth_date', sortByBirthDate == 1 ? 'asc' : 'desc'])
	}
	if (sortByPositionName) {
		orderBy.push([
			literal('position.name'),
			sortByPositionName == 1 ? 'asc' : 'desc',
		])
	}
	if (sortByNIP) {
		orderBy.push(['id_number', sortByNIP == 1 ? 'asc' : 'desc'])
	}
	if (sortByGender) {
		orderBy.push(['gender', sortByGender == 1 ? 'asc' : 'desc'])
	}

	Employee.findAndCountAll({
		include: [
			{
				model: db.position,
				attributes: ['name'],
			},
		],
		where: and(searchByName, { is_delete: false }),
		limit,
		offset,
		order: orderBy ? orderBy : [],
		raw: true,
	})
		.then((data) => {
			const response = getPagingData(data, page, limit)
			res.send(response)
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message ? err.message : 'Terjadi Kesalahan' })
		})
}

exports.findOne = (req, res) => {
	const { id } = req.params
	Employee.findOne({ where: { id: id, is_delete: false } })
		.then((response) => {
			res.send(response)
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message ? err.message : 'Terjadi Kesalahan' })
		})
}

exports.update = (req, res) => {
	const { id } = req.params
	const { name, birth_date, position_id, id_number, gender, is_delete } =
		req.body.data
	if (
		!name ||
		!birth_date ||
		!position_id ||
		!id_number ||
		!gender ||
		is_delete === undefined
	) {
		return res.status(500).send({ message: 'Field tidak boleh kosong!' })
	}
	Employee.update(
		{
			name: name,
			birth_date: birth_date,
			position_id: position_id,
			id_number: id_number,
			gender: gender,
			is_delete: is_delete,
		},
		{ where: { id: id, is_delete: false } }
	)
		.then((num) => {
			if (num == 1) {
				return res.send({
					code: num,
					message: `Data dengan id=${id} telah berhasil dirubah.`,
				})
			}
			res.send({
				code: num,
				message: `Tidak ada perubahan data dengan id=${id}.`,
			})
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message ? err.message : 'Terjadi Kesalahan' })
		})
}

exports.delete = (req, res) => {
	const { id } = req.params
	const { is_delete } = req.body
	Employee.update(
		{
			is_delete: is_delete,
		},
		{
			where: { id: id },
		}
	)
		.then((num) => {
			if (num == 1) {
				return res.send({
					message: `Data dengan id=${id} telah berhasil dihapus.`,
				})
			}
			res.send({
				message: `Tidak bisa hapus data dengan id=${id}.`,
			})
		})
		.catch((err) => {
			res
				.status(500)
				.send({ message: err.message ? err.message : 'Terjadi Kesalahan' })
		})
}
