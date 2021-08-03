import React, { Component } from 'react'
import Navigation from './navigation'
import Logo from './logo'

export default class Header extends Component {
	render = () => {
		return (
			<header style={s.header}>
				<div
					style={s.wrapper}
					className="mx-auto px-3 py-4 bg-primary text-white d-flex justify-content-between"
				>
					<Logo />
					<Navigation />
				</div>
			</header>
		)
	}
}

const s = {
	header: {
		position: 'absolute',
		left: '50%',
		top: 0,
		transform: 'translateX(-50%)',
		width: '100%',
		//background: '#eee',
	},
	wrapper: {
		maxWidth: '600px',
	},
}
