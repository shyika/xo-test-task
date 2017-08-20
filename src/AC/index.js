import constants from '../constants'
import {getStatus} from '../logic/game'

export function restartGame() {
	const {RESTART_GAME} = constants
	return {
		type: RESTART_GAME,
		payload: {}
	}
}

export function checkAndUpdateItem(location, turn) {
	const {ADD_ITEM, X, O} = constants
	return (dispatch, getState) => {
		const {markup, done} = getState().game
		if (done || markup[location] === X || markup[location] === O)
			return

		dispatch({
			type: ADD_ITEM,
			payload: {location, turn}
		})
	}
}

export function checkEndOFGame() {
	const {WIN,EQUAL_GAME} = constants
	return (dispatch, getState) => {
		const {game} = getState()
		if (game.done) return

		const {done, combination, winner, isEqual} = getStatus(game.markup)
		if (done) {
			(!isEqual) ?
				dispatch({type:WIN,payload:{done,combination,winner}}) :
				dispatch({type:EQUAL_GAME,payload:{done,isEqual}})
		}
	}
}