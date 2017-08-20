import constants from '../constants'
import {cloneDeep} from 'lodash'

const {ADD_ITEM, CHANGE_ITEM_TURN, X, WIN, RESTART_GAME, EQUAL_GAME} = constants

const initialState = {
	markup: [
    ' ',' ',' ',
    ' ',' ',' ',
    ' ',' ',' '
  ],
  turn: X,
  done: false,
  combination: undefined,
  winner: undefined,
  isEqual: false
}

export default (game = initialState, action) => {
	const {payload, type} = action

	switch (type) {
		case ADD_ITEM:
				const newState = cloneDeep(game)
				newState.markup.splice(payload.location, 1, payload.turn)
				return newState
		case CHANGE_ITEM_TURN:
			return {...game, turn: payload.turn}
		case WIN:
			return {
				...game,
				done: payload.done,
				combination: payload.combination,
				winner: payload.winner
			}
		case EQUAL_GAME:
			return {...game, done: payload.done, isEqual: payload.isEqual}
		case RESTART_GAME:
			return {...initialState}
	}

	return game
}