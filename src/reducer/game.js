import constants from '../constants'
import {cloneDeep} from 'lodash'

const {ADD_ITEM, DRAW_GAME, CHANGE_ITEM_TURN, X, WIN, RESTART_GAME, EQUAL_GAME, CHANGE_GRID_SIZE} = constants

// There is size by default
let size = 3
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
    case DRAW_GAME:
      return {...game, done: payload.done, isDraw: payload.isDraw}
    case WIN:
      return {
        ...game,
        done: payload.done,
        winner: payload.winner
      }
    case RESTART_GAME:
      return {...initialState, board: payload.board, size: payload.size}
    case CHANGE_GRID_SIZE:
      return {...initialState, board: payload.board, size: payload.size}
  }

  return game
}