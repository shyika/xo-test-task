import constants from '../constants'
import {cloneDeep} from 'lodash'

const {ADD_ITEM, CHANGE_ITEM_TURN, X, WIN, RESTART_GAME, EQUAL_GAME} = constants

let size = 4
let board = new Array(size)

for (let i = 0; i < size; i++)
	board[i] = new Array(size).fill(0)

// 1 = X
// -1 = O
// 0 = blank tile
const initialState = {
	board,
	size,
  turn: 1,
  done: false,
  winner: undefined,
  isDraw: false
}

export default (game = initialState, action) => {
	const {payload, type} = action

	switch (type) {
		case ADD_ITEM:
				const ns = cloneDeep(game)
				ns.board[payload.row][payload.col] = payload.turn
				return ns
		case CHANGE_ITEM_TURN:
			return {...game, turn: payload.turn}
		/*case WIN:
			return {
				...game,
				done: payload.done,
				combination: payload.combination,
				winner: payload.winner
			}
		case EQUAL_GAME:
			return {...game, done: payload.done, isEqual: payload.isEqual}
		case RESTART_GAME:
			return {...initialState} */
	}

	return game
}