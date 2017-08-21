import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import BoardTile from '../BoardTile'
import Result from '../Result'
import {checkAndUpdateTile, isFinished, restartGame} from '../../AC'


import './styles.less'


class TicTacToe extends React.Component {
	static propTypes = {
		// from connect
		gameState: PropTypes.shape({
			board: PropTypes.array.isRequired,
			turn: PropTypes.number,
			done: PropTypes.bool.isRequired,
			winner: PropTypes.string,
			isDraw: PropTypes.bool
		})
	}

	updateTile = (row, col) => () => {
		this.props.checkAndUpdateTile(row, col)
	}

	componentWillReceiveProps({isFinished}) {
		isFinished()
	}

	restartGame = () => {
		// this.props.restartGame()
	}

	render() {
		// const {turn, done, isEqual, winner, combination} = this.props.gameState
		// const resultParams = {isEqual, winner, restartGame: this.restartGame}

		// const classes = getClassesByCombination(combination)
		const {board, turn} = this.props.gameState

		return (
				<div className="container">
					<div className="row">
						<div className="col-12 col-sm-12">
							<h1 class="text-center">Titck tak toe simple game!</h1>
							<hr/>
						</div>
					</div>
					<div className="row">
						<div className="col-12 col-sm-12">
						<table className="table table-bordered">
							<tbody>
								{this.props.gameState.board.map((r, i) =>
									<tr key={i}>
										{r.map((c, j) =>
											<BoardTile row={i} updateTile={this.updateTile} val={c} col={j} key={j} />
										)}
									</tr>
								)}
							</tbody>
						</table>
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
}, {checkAndUpdateTile, isFinished})(TicTacToe)