import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PositionDataService from '../services/position.service'
import EmployeeDataService from '../services/employee.service'

export default class EmployeeEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {
				id: null,
				name: '',
				birth_date: '',
				gender: 0,
				id_number: '',
				position_id: 0,
			},
			messageNumber: '',
			messageValidation: '',
			message: '',
			submitConfirmation: '',
			status: false,
			color: '',
			position: [],
		}
	}
	componentDidMount = () => {
		document.title = `Employee Edit - Master Karyawan`
		this.retrievePosition()
		this.retrieveEmployee(this.props.match.params.id)
	}

	retrieveEmployee = (id) => {
		EmployeeDataService.get(id).then((response) => {
			const { data } = response
			this.setState({
				data: data,
			})
		})
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

		this.setState((prevState) => {
			return {
				status: true,
				message: 'Perubahan belum tersimpan.',
				color: 'warning',
				data: {
					...prevState.data,
					[name]: name === 'gender' ? parseInt(value) : value,
				},
			}
		})
	}

	handleNIP = (e) => {
		const { value } = e.target
		const onlyNumber = value.replace(/[^0-9]/g, '')
		if (`${onlyNumber}` === this.state.data.id_number) {
			this.setState({
				messageNumber: 'Hanya diperbolehkan input angka.',
			})
		} else {
			this.setState({
				messageNumber: '',
			})
		}
		this.setState((prevState) => {
			return {
				data: {
					...prevState.data,
					id_number: onlyNumber,
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
		const { name, birth_date, position_id, id_number, gender } = this.state.data
		EmployeeDataService.update(this.props.match.params.id, {
			name,
			birth_date,
			position_id,
			id_number,
			gender,
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
			position,
			messageValidation,
			messageNumber,
			submitConfirmation,
			status,
			message,
			color,
		} = this.state
		return (
			<div className="mx-auto" style={{ maxWidth: '300px' }}>
				<h4 className="my-3 text-center">Edit Employee</h4>
				<hr />
				<div>
					<label style={{ fontSize: '13px' }}>Nama</label>
					<input
						name="name"
						placeholder="Nama"
						type="text"
						value={data.name}
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
					<label style={{ fontSize: '13px' }}>Tanggal lahir</label>
					<input
						name="birth_date"
						type="date"
						value={data.birth_date}
						onChange={this.handleChange}
						className="form-control mt-1 mb-3"
					/>
					{messageValidation && !data.birth_date && (
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
						value={data.position_id}
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
					{messageValidation && data.position_id === 0 && (
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
						value={data.id_number}
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
					{messageValidation && !data.id_number && (
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
								checked={data.gender === 1}
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
								checked={data.gender === 2}
								onChange={this.handleChange}
								name="gender"
							/>
							<label className="form-check-label">Wanita</label>
						</div>
					</div>
					{messageValidation && data.gender === 0 && (
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
					{status && (
						<div className={`mt-3 alert alert-${color} py-2`}>{message}</div>
					)}
				</div>
			</div>
		)
	}
}
