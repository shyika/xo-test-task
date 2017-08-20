import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import MarkupItem from '../MarkupItem'
import Result from '../Result'
import {checkAndUpdateItem, checkEndOFGame, restartGame} from '../../AC'
import {getClassesByCombination} from '../../logic/game'

class TicTacToe extends React.Component {
	static propTypes = {
		// from connect
		gameState: PropTypes.shape({
			markup: PropTypes.array.isRequired,
			turn: PropTypes.string.isRequired,
			done: PropTypes.bool.isRequired,
			combination: PropTypes.string,
			winner: PropTypes.oneOfType([PropTypes.string]),
			isEqual: PropTypes.bool
		})
	}

	updateItem = (pos, turn) => (e) => {
		this.props.checkAndUpdateItem(pos, turn)
	}

	componentWillReceiveProps({checkEndOFGame}) {
		checkEndOFGame()
	}

	restartGame = () => {
		this.props.restartGame()
	}

	render() {
		const {turn, done, isEqual, winner, combination} = this.props.gameState
		const resultParams = {isEqual, winner, restartGame: this.restartGame}

		const classes = getClassesByCombination(combination)

		const gameMarkup = this.props.gameState.markup.map((val, i) => {
			return (
				<MarkupItem key={i} val={val} pos={i} cl={classes[i]} turn={turn} updateItem={this.updateItem} />
			)
		})

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-sm-12">
						<h1 class="text-center">Titck tak toe simple game!</h1>
						<hr/>
					</div>
				</div>
				<div className="row">
					<div className="cc col-sm-9 col-12 col-lg-5">
						{done && <Result {...resultParams}/>}
						<div className="row">
							{gameMarkup}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(state => {
	return {
		gameState: state.game
	}
}, {checkAndUpdateItem, checkEndOFGame, restartGame})(TicTacToe)