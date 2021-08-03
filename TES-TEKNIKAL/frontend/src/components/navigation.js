import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navigation extends Component {
	render = () => {
		return (
			<nav className="d-flex justify-content-end">
				<Link
					to={'/employee'}
					style={s.button}
					className="btn btn-outline-light mx-1"
				>
					Employee
				</Link>
				<Link
					to={'/position'}
					style={s.button}
					className="btn btn-outline-light mx-1"
				>
					Jabatan
				</Link>
			</nav>
		)
	}
}

const s = {
	button: {
		fontSize: '14px',
	},
}
