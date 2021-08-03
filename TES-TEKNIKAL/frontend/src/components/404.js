import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends Component {
	componentDidMount = () => {
		document.title = `Not Found - Master Karyawan`
	}

	render = () => {
		return (
			<div style={s.wrapper} class="text-center">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="5em"
						height="5em"
						fill="currentColor"
						class="bi bi-emoji-frown"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
						<path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
					</svg>
				</div>
				<div className="h3 my-3 text-center">404 Not Found</div>
				<Link to={'/'} className="btn block w-50 btn-secondary">
					Back To Home
				</Link>
			</div>
		)
	}
}

const s = {
	wrapper: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%,-50%)',
		width: '300px',
	},
}
