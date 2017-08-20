import constants from '../constants'

const {X, O, ADD_ITEM, CHANGE_ITEM_TURN} = constants

function toggleItemTurn(turn) {
	return (turn.toString() === X)? O: X
}

export default store => next => action => {
	const {location, turn} = action.payload

	switch (action.type) {
		case ADD_ITEM:
			next({
				type: CHANGE_ITEM_TURN,
				payload: {turn: toggleItemTurn(turn)}
			})
	}

	next(action)
}