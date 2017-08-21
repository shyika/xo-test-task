import constants from '../constants'
import {getStatus} from '../logic/game'

const {ADD_ITEM, CHANGE_ITEM_TURN, X, O} = constants

function getNextTurn(t) {
	return (t === 1)? -1: 1
}

function retResObj(winner: null, done=true, isDraw=false) {
	return {done, winner}
}

function getResult(b, size) {
	// Check rows
	for (let i = 0; i < size; i++) {
		let rSum = 0
		for (let j = 0; j < size; j++)
			rSum += b[i][j]
		if (rSum === size) return retResObj(X)
		else if (rSum === -size) return retResObj(O)
	}

	// Check columns
	for (let i = 0; i < size; i++) {
		let cSum = 0
		for (let j = 0; j < size; j++)
			cSum += b[j][i]
		if (cSum === size) return retResObj(X)
		else if (cSum === -size) return retResObj(O)
	}

	// Check left diagonale
	let lDSum = 0
	for (let i = 0; i < size; i++)
		lDSum += b[i][i]
	if (lDSum === size) return retResObj(X)
	else if (lDSum === -size) return retResObj(O)

	// Check right diagonale
	let rDSum = 0
	let rs = size - 1
	for (let i = 0; i < size; i++) {
		rDSum += b[i][rs]
		rs--
	}
	if (rDSum === size) return retResObj(X)
	else if (rDSum === -size) return retResObj(O)

	return retResObj()
}

export function restartGame() {
	const {RESTART_GAME} = constants
	return {
		type: RESTART_GAME,
		payload: {}
	}
}

export function checkAndUpdateTile(row, col) {
	return (dispatch, getState) => {
		const {board, done, turn} = getState().game

		if (done || board[row][col] === 1 || board[row][col] === -1)
			return

		dispatch({
			type: ADD_ITEM,
			payload: {row, col, turn}
		})

		dispatch({
			type: CHANGE_ITEM_TURN,
			payload: {turn: getNextTurn(turn)}
		})
	}
}

export function isFinished() {
	const {WIN,EQUAL_GAME} = constants
	return (dispatch, getState) => {
		const {game} = getState()
		if (game.done) return

		const {board, size} = game
		const res = getResult(board, size)

		console.info(res)

		// const {done, combination, winner, isEqual} = getStatus(game.markup)
		// if (done) {
		// 	(!isEqual) ?
		// 		dispatch({type:WIN,payload:{done,combination,winner}}) :
		// 		dispatch({type:EQUAL_GAME,payload:{done,isEqual}})
		// }
	}
}