import React, { Component } from 'react'
import {ConnectedRouter} from 'react-router-redux'
import { Route, Redirect, Switch } from 'react-router-dom'

import history from '../../history'

import TicTacToe from '../TicTacToe'

import '../../styles/main.less'

class App extends Component {
	render() {
		return (
			<ConnectedRouter history = {history}>
				<div>
					<Switch>
						<Route path="/" exact component={TicTacToe} />
						<Redirect from="*" to="/" />
					</Switch>
				</div>
			</ConnectedRouter>
		)
	}
}

export default App