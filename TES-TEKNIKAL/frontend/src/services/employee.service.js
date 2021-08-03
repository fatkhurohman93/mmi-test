import http from '../http'

class Employee {
	create(data) {
		return http.post('/employee', { data })
	}

	get(id) {
		return http.get(`/employee/${id}`)
	}

	getAll(params) {
		return http.get('/employee', { params })
	}

	update(id, data) {
		return http.put(`/employee/${id}`, { data })
	}

	delete(id, data) {
		return http.delete(`/employee/${id}`, { data })
	}
}

export default new Employee()
