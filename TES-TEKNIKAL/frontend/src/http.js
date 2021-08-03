import axios from 'axios'

// DEVELOP MODE
// export default axios.create({
// 	baseURL: 'http://localhost:3003/api',
// 	headers: {
// 		'Content-type': 'application/json',
// 	},
// })

// PRODUCTION MODE
export default axios.create({
	baseURL: '/api',
	headers: {
		'Content-type': 'application/json',
	},
})
