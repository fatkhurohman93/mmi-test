const db = require('../models')
const Position = db.position
const { literal, and, Op } = db.Sequelize

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
	const { code, name, is_delete } = req.body.data

	if (!code || !name || is_delete === undefined) {
		return res.status(500).send({ message: 'Field tidak boleh kosong!' })
	}
	Position.create({ code: code, name: name, is_delete: is_delete })
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
	const { page, size, name, sortByName, sortByCode } = req.query
	let searchByName = name ? { name: { [Op.like]: `%${name}%` } } : null

	const { limit, offset } = getPagination(page, size)
	const orderBy = []
	if (sortByName) {
		orderBy.push(['name', sortByName == 1 ? 'asc' : 'desc'])
	}
	if (sortByCode) {
		orderBy.push(['code', sortByCode == 1 ? 'asc' : 'desc'])
	}
	Position.findAndCountAll({
		where: and(searchByName, { is_delete: false }),
		order: orderBy ? orderBy : [],
		limit,
		offset,
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
	Position.findOne({ where: { id: id, is_delete: false } })
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
	const { code, name, is_delete } = req.body.data
	if (!code || !name || is_delete === undefined) {
		return res.status(500).send({ message: 'Field tidak boleh kosong!' })
	}
	Position.update(
		{ code: code, name: name, is_delete: is_delete },
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

	Position.update(
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
