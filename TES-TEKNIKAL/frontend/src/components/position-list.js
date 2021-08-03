import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PositionDataService from '../services/position.service'
import Loading from './loading'
import DeleteTrigger from './delete-trigger'
import Pagination from '@material-ui/lab/Pagination'

export default class PositionList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			sortByCode: false,
			sortByName: false,
			page: 1,
			pageSize: 10,
			count: 0,

			search: '',
			isLoadingSearch: false,
			typingTimeout: 0,

			deleteTrigger: false,
			dataID: null,
		}
		this.pageSizes = [10, 15, 25]
	}
	componentDidMount = () => {
		document.title = `Position List - Master Karyawan`

		this.retrievePosition()
	}

	handleSearch = (e) => {
		const element = document.getElementById('content-list')
		element.classList.add('__blur_content')

		const search = e.target.value
		if (this.state.typingTimeout) {
			clearTimeout(this.state.typingTimeout)
		}

		this.setState({
			search: search,
			page: 1,
			isLoadingSearch: true,
			typingTimeout: setTimeout(() => {
				this.retrievePosition(search)
			}, 500),
		})
	}

	getRequestParams = (search, page, pageSize) => {
		let params = {}
		const { sortByName, sortByCode } = this.state

		if (search) {
			params['name'] = search
		}

		if (page) {
			params['page'] = page - 1
		}

		if (pageSize) {
			params['size'] = pageSize
		}
		if (sortByName) {
			params['sortByName'] = sortByName
		}
		if (sortByCode) {
			params['sortByCode'] = sortByCode
		}

		return params
	}

	handlePageChange = (e, value) => {
		const element = document.getElementById('content-list')
		element.classList.add('__blur_content')
		this.setState(
			{
				page: value,
				isLoadingSearch: true,
			},
			() => {
				this.retrievePosition(this.state.search)
			}
		)
	}

	handlePageSizeChange = (e) => {
		this.setState(
			{
				pageSize: e.target.value,
				page: 1,
			},
			() => {
				this.retrievePosition(this.state.search)
			}
		)
	}

	handleSortByCode = () => {
		const { sortByCode, search } = this.state
		this.setState(
			{
				sortByCode: sortByCode === false ? 1 : sortByCode === 1 ? 2 : false,
				sortByName: false,
				page: 1,
			},
			() => {
				this.retrievePosition(search)
			}
		)
	}

	handleSortByName = () => {
		const { sortByName, search } = this.state
		this.setState(
			{
				sortByName: sortByName === false ? 1 : sortByName === 1 ? 2 : false,
				sortByCode: false,
				page: 1,
			},
			() => {
				this.retrievePosition(search)
			}
		)
	}

	retrievePosition = (search) => {
		const { page, pageSize } = this.state
		const params = this.getRequestParams(search, page, pageSize)

		PositionDataService.getAll(params).then((response) => {
			const { data, totalPages } = response.data
			const element = document.getElementById('content-list')
			if (element) {
				element.classList.remove('__blur_content')
			}
			this.setState({
				data: data,
				count: totalPages,

				isLoadingSearch: false,
			})
		})
	}

	deleteTrigger = (e) => {
		const { deleteTrigger } = this.state
		const { value } = e.target
		if (deleteTrigger) {
			const element = document.getElementById('content-list')
			element.classList.remove('__blur')
			this.setState({
				deleteTrigger: false,
				dataID: null,
			})
		} else {
			const element = document.getElementById('content-list')
			element.classList.add('__blur')
			this.setState({
				deleteTrigger: true,
				dataID: parseInt(value),
			})
		}
	}

	handleDelete = () => {
		const { dataID } = this.state

		PositionDataService.delete(dataID, { is_delete: true })
			.then(() => {
				this.setState({
					deleteTrigger: false,
					dataID: null,
				})
				const element = document.getElementById('content-list')
				element.classList.remove('__blur')
				this.retrievePosition()
			})
			.catch((err) => {
				// console.log(err)
			})
	}

	render = () => {
		const {
			data,
			sortByCode,
			sortByName,
			search,
			page,
			pageSize,
			count,
			isLoadingSearch,
			deleteTrigger,
		} = this.state
		return (
			<div>
				{deleteTrigger && (
					<DeleteTrigger
						trigger={this.deleteTrigger}
						delete={this.handleDelete}
					/>
				)}
				<h4 className="text-center">Jabatan List</h4>
				<hr />
				<div style={{ maxWidth: '500px', margin: '0 auto' }}>
					<Link to={'/position/add'} className="btn btn-primary w-100">
						+ Add New
					</Link>
					<input
						className="form-control my-3"
						type="text"
						onChange={this.handleSearch}
						value={search}
						placeholder="Cari berdasarkan nama"
					/>
					<div className="d-flex justify-content-between ">
						<Pagination
							className="my-3"
							count={count}
							page={page}
							siblingCount={1}
							boundaryCount={1}
							onChange={this.handlePageChange}
						/>
						<select
							className="form-control list-control my-auto"
							style={{ width: '50px', height: '35px' }}
							onChange={this.handlePageSizeChange}
							value={pageSize}
						>
							{this.pageSizes.map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</select>
					</div>

					{isLoadingSearch ? (
						<Loading
							position="position-absolute"
							right={0}
							left={0}
							zIndex={999}
						/>
					) : (
						<div className="d-none"></div>
					)}
					<div id="content-list" className="table-wrapper overflow-auto">
						<table
							className="table table-striped"
							style={{ minWidth: '500px' }}
						>
							<thead className="bg-primary text-white">
								<tr>
									<th style={{ width: '50px', verticalAlign: 'middle' }}>No</th>
									<th>
										<span>Code</span>
										<span className="mx-2">
											<button
												onClick={this.handleSortByCode}
												className="btn text-white"
											>
												{sortByCode === false ? (
													<None />
												) : sortByCode === 1 ? (
													<Asc />
												) : (
													<Desc />
												)}
											</button>
										</span>
									</th>
									<th>
										<span>Name</span>
										<span className="mx-2">
											<button
												onClick={this.handleSortByName}
												className="btn text-white"
											>
												{sortByName === false ? (
													<None />
												) : sortByName === 1 ? (
													<Asc />
												) : (
													<Desc />
												)}
											</button>
										</span>
									</th>
									<th style={{ width: '110px', verticalAlign: 'middle' }}>
										Action
									</th>
								</tr>
							</thead>
							{data.length !== 0 ? (
								<tbody>
									{data &&
										data.map((list, index) => (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{list.code}</td>
												<td>{list.name}</td>
												<td>
													<Link
														style={{ fontSize: '12px' }}
														className="btn btn-sm btn-warning mx-1"
														to={`/position/${list.id}`}
													>
														Edit
													</Link>
													<button
														style={{ fontSize: '12px' }}
														className="btn btn-sm btn-danger mx-1"
														value={list.id}
														onClick={this.deleteTrigger}
													>
														Del
													</button>
												</td>
											</tr>
										))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td colSpan="4" className="text-center">
											Tidak Ada Data
										</td>
									</tr>
								</tbody>
							)}
						</table>
					</div>
				</div>
			</div>
		)
	}
}

const Asc = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="currentColor"
			className="bi bi-arrow-up"
			viewBox="0 0 16 16"
		>
			<path
				fillRule="evenodd"
				d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
			/>
		</svg>
	)
}

const Desc = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="currentColor"
			className="bi bi-arrow-down"
			viewBox="0 0 16 16"
		>
			<path
				fillRule="evenodd"
				d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
			/>
		</svg>
	)
}

const None = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1em"
			height="1em"
			fill="currentColor"
			className="bi bi-dash"
			viewBox="0 0 16 16"
		>
			<path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
		</svg>
	)
}
