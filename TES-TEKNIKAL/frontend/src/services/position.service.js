import http from '../http'

class Position {
	create(data) {
		return http.post('/position', { data })
	}

	get(id) {
		return http.get(`/position/${id}`)
	}

	getAll(params) {
		return http.get('/position', { params })
	}

	update(id, data) {
		return http.put(`/position/${id}`, { data })
	}

	delete(id, data) {
		return http.delete(`/position/${id}`, { data })
	}
}

export default new Position()
