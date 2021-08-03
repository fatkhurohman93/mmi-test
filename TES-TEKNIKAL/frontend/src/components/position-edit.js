import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PositionDataService from '../services/position.service'

export default class PositionEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {
				id: null,
				name: '',
				code: '',
			},
			messageValidation: '',
			message: '',
			submitConfirmation: '',
			status: false,
			color: '',
		}
	}
	componentDidMount = () => {
		document.title = `Position Edit - Master Karyawan`
		this.retrievePosition(this.props.match.params.id)
	}

	retrievePosition = (id) => {
		PositionDataService.get(id).then((response) => {
			const { data } = response
			this.setState({
				data: data,
			})
		})
	}

	handleChange = (e) => {
		const { value, name } = e.target

		this.setState((prevState) => {
			return {
				status: true,
				message: 'Perubahan belum tersimpan.',
				color: 'warning',
				data: {
					...prevState.data,
					[name]: value,
				},
			}
		})
	}

	handleSubmitConfirmation = () => {
		this.setState({
			submitConfirmation: this.state.submitConfirmation ? false : true,
		})
	}

	handleUpdate = () => {
		const { name, code } = this.state.data
		PositionDataService.update(this.props.match.params.id, {
			name,
			code,
			is_delete: false,
		})
			.then((response) => {
				this.setState({
					status: true,
					color: response.data.code[0] === 1 ? 'success' : 'danger',
					message:
						response.data.code[0] === 1
							? 'Perubahan berhasil disimpan.'
							: 'Tidak ada perubahan.',
					submitConfirmation: false,
				})
			})
			.catch((err) => {
				this.setState({
					status: true,
					color: 'danger',
					message: err.response
						? err.response.data.message
						: 'Terjadi Kesalahan.',
					messageValidation: err.response
						? err.response.data.message
						: 'Terjadi Kesalahan.',
					submitConfirmation: false,
				})
			})
	}

	render = () => {
		const {
			data,
			messageValidation,
			submitConfirmation,
			status,
			message,
			color,
		} = this.state
		return (
			<div className="mx-auto" style={{ maxWidth: '300px' }}>
				<h4 className="my-3 text-center">Edit Position</h4>
				<hr />
				<div>
					<label style={{ fontSize: '13px' }}>Code</label>
					<input
						name="code"
						placeholder="Code"
						type="text"
						value={data.code}
						onChange={this.handleChange}
						className="form-control mt-1 mb-3"
					/>
					{messageValidation && !data.code && (
						<div
							style={{ fontSize: '13px' }}
							className="alert alert-danger py-2"
						>
							{messageValidation}
						</div>
					)}
					<label style={{ fontSize: '13px' }}>Nama</label>
					<input
						name="name"
						placeholder="Nama"
						type="text"
						value={data && data.name}
						onChange={this.handleChange}
						className="form-control mt-1 mb-3"
					/>
					{messageValidation && !data.name && (
						<div
							style={{ fontSize: '13px' }}
							className="alert alert-danger py-2"
						>
							{messageValidation}
						</div>
					)}
					{submitConfirmation ? (
						<div className="mt-4">
							<p
								className="text-center alert alert-warning"
								style={{ fontSize: '14px' }}
							>
								Apakah anda yakin ingin menyimpan Data Ini?
							</p>
							<div className="d-flex justify-content-between">
								<button
									className="btn btn-secondary"
									onClick={this.handleSubmitConfirmation}
								>
									Batal
								</button>
								<button className="btn btn-primary" onClick={this.handleUpdate}>
									Yakin
								</button>
							</div>
						</div>
					) : (
						<div className="d-flex justify-content-between mt-4">
							<Link to={'/position'} className="btn btn-secondary">
								Kembali
							</Link>
							<button
								className="btn btn-primary"
								onClick={this.handleSubmitConfirmation}
							>
								Simpan
							</button>
						</div>
					)}
					{status && (
						<div className={`mt-3 alert alert-${color} py-2`}>{message}</div>
					)}
				</div>
			</div>
		)
	}
}
