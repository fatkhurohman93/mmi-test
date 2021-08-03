import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PositionDataService from '../services/position.service'

export default class PositionAdd extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			code: '',

			messageValidation: '',
			message: '',
			position: [],
			submitConfirmation: false,
			statusSubmit: false,
		}
	}

	componentDidMount = () => {
		document.title = `Position Add - Master Karyawan`
	}

	handleChange = (e) => {
		const { value, name } = e.target
		this.setState({
			[name]: value,
		})
	}

	handleSubmitConfirmation = () => {
		this.setState({
			submitConfirmation: this.state.submitConfirmation ? false : true,
		})
	}

	handleSubmit = () => {
		const { name, code } = this.state
		PositionDataService.create({
			name,
			code,
			is_delete: false,
		})
			.then(() => {
				// const { data } = response.data
				this.setState({
					statusSubmit: true,
					messageValidation: '',
					name: '',
					code: '',
					submitConfirmation: false,
				})
			})
			.catch((err) => {
				this.setState({
					messageValidation: err.response ? err.response.data.message : '',
					message: err.response ? '' : err.message,
					submitConfirmation: false,
				})
			})
	}

	addNew = () => {
		this.setState({
			statusSubmit: false,
		})
	}

	render = () => {
		const { name, code, messageValidation, submitConfirmation, statusSubmit } =
			this.state
		return (
			<div className="mx-auto" style={{ maxWidth: '300px' }}>
				<h4 className="my-3 text-center">Add Jabatan</h4>
				<hr />
				{statusSubmit ? (
					<div>
						<div className="alert alert-success py-2">
							Data jabatan telah berhasil tersimpan.
						</div>
						<div className="d-flex justify-content-between mt-3">
							<Link to={'/position'} className="btn btn-secondary">
								Kembali
							</Link>
							<button className="btn btn-primary" onClick={this.addNew}>
								Tambahkan lagi
							</button>
						</div>
					</div>
				) : (
					<div>
						<label style={{ fontSize: '13px' }}>Code</label>
						<input
							name="code"
							placeholder="code"
							type="text"
							value={code}
							onChange={this.handleChange}
							className="form-control mt-1 mb-3"
						/>
						{messageValidation && !code && (
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
							value={name}
							onChange={this.handleChange}
							className="form-control mt-1 mb-3"
						/>
						{messageValidation && !name && (
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
									<button
										className="btn btn-primary"
										onClick={this.handleSubmit}
									>
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
					</div>
				)}
			</div>
		)
	}
}
