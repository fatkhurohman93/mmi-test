import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from './components/header'
import NotFound from './components/404'
import EmployeeList from './components/employee-list'
import PositionList from './components/position-list'
import EmployeeAdd from './components/employee-add'
import PositionAdd from './components/position-add'
import EmployeeEdit from './components/employee-edit'
import PositionEdit from './components/position-edit'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render = () => {
		return (
			<div style={s.background}>
				<section style={s.container}>
					<Router>
						<Header />
						<div className="mt-5 pt-5 mx-3">
							<Switch>
								<Route
									exact
									path={['/', '/employee']}
									component={EmployeeList}
								/>
								<Route exact path={'/employee/add'} component={EmployeeAdd} />
								<Route exact path={'/employee/:id'} component={EmployeeEdit} />
								<Route exact path={'/position'} component={PositionList} />
								<Route exact path={'/position/add'} component={PositionAdd} />
								<Route exact path={'/position/:id'} component={PositionEdit} />

								<Route path={'*'} component={NotFound} />
							</Switch>
						</div>
					</Router>
				</section>
			</div>
		)
	}
}

const s = {
	container: {
		maxWidth: '600px',
		margin: '0 auto',
		background: '#fff',
	},
	background: {
		//	background: '#eee',
		height: '100%',
		width: '100%',
	},
}

export default App
