import React, { Component } from 'react'

export default class Loading extends Component {
	render() {
		return (
			<div
				id="delete-popup"
				style={{
					position: 'fixed',
					zIndex: '99',
					width: '300px',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<div
					style={{ background: '#fff !important' }}
					className="d-flex justify-content-around rounded shadow p-4"
				>
					<button
						className="delete btn btn-danger m-4"
						style={{
							width: '100px',
						}}
						onClick={this.props.delete}
					>
						Yakin
					</button>
					<button
						className="delete btn btn-secondary m-4"
						style={{ width: '100px' }}
						onClick={this.props.trigger}
					>
						Batalkan
					</button>
				</div>
			</div>
		)
	}
}
