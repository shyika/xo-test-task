import constants from '../constants'

const {ADD_ITEM, CHANGE_ITEM_TURN, X, O, DRAW_GAME, WIN, RESTART_GAME, CHANGE_GRID_SIZE} = constants

function getNextTurn(t) {
	return (t === 1)? -1: 1
}

function initNBoard(size) {
	let board = new Array(size)
	for (let i = 0; i < size; i++)
		board[i] = new Array(size).fill(0)
	return board
}

function retResObj(winner: null, done=false, isDraw=false) {
	return {done, winner, isDraw}
}

function getResult(b, size) {
	let dCount = 0
	// Check rows and isDraw
	for (let i = 0; i < size; i++) {
		let rSum = 0
		for (let j = 0; j < size; j++) {
			rSum += b[i][j]
			if (b[i][j] === 0) dCount++
		}
		if (rSum === size) return retResObj(X, true)
		else if (rSum === -size) return retResObj(O, true)
	}

	// Check columns
	for (let i = 0; i < size; i++) {
		let cSum = 0
		for (let j = 0; j < size; j++)
			cSum += b[j][i]
		if (cSum === size) return retResObj(X, true)
		else if (cSum === -size) return retResObj(O, true)
	}

	// Check left diagonale
	let lDSum = 0
	for (let i = 0; i < size; i++)
		lDSum += b[i][i]
	if (lDSum === size) return retResObj(X, true)
	else if (lDSum === -size) return retResObj(O, true)

	// Check right diagonale
	let rDSum = 0
	let rs = size - 1
	for (let i = 0; i < size; i++) {
		rDSum += b[i][rs]
		rs--
	}
	if (rDSum === size) return retResObj(X, true)
	else if (rDSum === -size) return retResObj(O, true)

	if (!dCount) return retResObj(null, true, true)

	return retResObj()
}

export function restartGame(size) {
	const board = initNBoard(size)
	return {
		type: RESTART_GAME,
		payload: {
			board, size
		}
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

		// Handle results
		const {done, winner, isDraw} = res
		if (done)
			(isDraw)?
				dispatch({type: DRAW_GAME, payload: {done, isDraw}}) :
				dispatch({type: WIN, payload: {done, winner}})
	}
}

export function changeGridSize(size) {
	const board = initNBoard(size)
	return dispatch => dispatch({type: CHANGE_GRID_SIZE, payload: {size, board}})
}