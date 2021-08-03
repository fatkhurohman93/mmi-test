import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PositionDataService from '../services/position.service'
import EmployeeDataService from '../services/employee.service'

export default class EmployeeAdd extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			birth_date: '',
			gender: 0,
			id_number: '',
			position_id: 0,
			messageNumber: '',
			messageValidation: '',
			message: '',
			position: [],
			submitConfirmation: false,
			statusSubmit: false,
		}
	}

	componentDidMount = () => {
		document.title = `Employee Add - Master Karyawan`
		this.retrievePosition()
	}

	retrievePosition = () => {
		PositionDataService.getAll()
			.then((response) => {
				const { data } = response.data
				this.setState({ position: data })
			})
			.catch((err) => {
				//console.log(err)
			})
	}

	handleChange = (e) => {
		const { value, name } = e.target
		this.setState({
			[name]: name === 'gender' ? parseInt(value) : value,
		})
	}

	handleNIP = (e) => {
		const { value } = e.target
		const onlyNumber = value.replace(/[^0-9]/g, '')
		if (`${onlyNumber}` === this.state.id_number) {
			this.setState({
				messageNumber: 'Hanya diperbolehkan input angka.',
			})
		} else {
			this.setState({
				messageNumber: '',
			})
		}
		this.setState({
			id_number: onlyNumber,
		})
	}

	handleSubmitConfirmation = () => {
		this.setState({
			submitConfirmation: this.state.submitConfirmation ? false : true,
		})
	}
	handleSubmit = () => {
		const { name, birth_date, position_id, id_number, gender } = this.state
		EmployeeDataService.create({
			name,
			birth_date,
			position_id,
			id_number,
			gender,
			is_delete: false,
		})
			.then(() => {
				// const { data } = response.data
				this.setState({
					statusSubmit: true,
					messageValidation: '',
					messageNumber: '',
					name: '',
					birth_date: '',
					position_id: 0,
					id_number: '',
					gender: 0,
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
		const {
			position,
			name,
			birth_date,
			position_id,
			id_number,
			gender,
			messageNumber,
			submitConfirmation,
			messageValidation,
			statusSubmit,
		} = this.state
		return (
			<div className="mx-auto" style={{ maxWidth: '300px' }}>
				<h4 className="my-3 text-center">Add Employee</h4>
				<hr />
				{statusSubmit ? (
					<div>
						<div className="alert alert-success py-2">
							Data employee telah berhasil tersimpan.
						</div>
						<div className="d-flex justify-content-between mt-3">
							<Link to={'/employee'} className="btn btn-secondary">
								Kembali
							</Link>
							<button className="btn btn-primary" onClick={this.addNew}>
								Tambahkan lagi
							</button>
						</div>
					</div>
				) : (
					<div>
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
						<label style={{ fontSize: '13px' }}>Tanggal lahir</label>
						<input
							name="birth_date"
							type="date"
							value={birth_date}
							onChange={this.handleChange}
							className="form-control mt-1 mb-3"
						/>
						{messageValidation && !birth_date && (
							<div
								style={{ fontSize: '13px' }}
								className="alert alert-danger py-2"
							>
								{messageValidation}
							</div>
						)}
						<label style={{ fontSize: '13px' }}>Jabatan</label>
						<select
							name="position_id"
							value={position_id}
							className="form-control mt-1 mb-3"
							onChange={this.handleChange}
						>
							<option value={0} disabled>
								Pilih Jabatan
							</option>
							{position &&
								position.map((list, index) => (
									<option key={index} value={list.id}>
										{list.name}
									</option>
								))}
						</select>
						{messageValidation && position_id === 0 && (
							<div
								style={{ fontSize: '13px' }}
								className="alert alert-danger py-2"
							>
								{messageValidation}
							</div>
						)}
						<label style={{ fontSize: '13px' }}>NIP</label>
						<input
							name="id_number"
							type="text"
							placeholder="NIP"
							onChange={this.handleNIP}
							value={id_number}
							className="form-control mt-1 mb-3"
						/>
						{messageNumber && (
							<div
								className="alert alert-danger py-2"
								style={{ fontSize: '13px' }}
							>
								{messageNumber}
							</div>
						)}
						{messageValidation && !id_number && (
							<div
								style={{ fontSize: '13px' }}
								className="alert alert-danger py-2"
							>
								{messageValidation}
							</div>
						)}
						<label style={{ fontSize: '13px' }}>Jenis Kelamin</label>
						<div className="d-flex justify-content-start mt-1">
							<div className="form-check ">
								<input
									className="form-check-input"
									type="radio"
									value={1}
									checked={gender === 1}
									onChange={this.handleChange}
									name="gender"
								/>
								<label className="form-check-label">Pria</label>
							</div>
							<div className="form-check mx-3">
								<input
									className="form-check-input"
									type="radio"
									value={2}
									checked={gender === 2}
									onChange={this.handleChange}
									name="gender"
								/>
								<label className="form-check-label">Wanita</label>
							</div>
						</div>
						{messageValidation && gender === 0 && (
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
								<Link to={'/employee'} className="btn btn-secondary">
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
