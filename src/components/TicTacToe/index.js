import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import BoardTile from '../BoardTile'
import Result from '../Result'
import {checkAndUpdateTile, isFinished, restartGame, changeGridSize} from '../../AC'


import './styles.less'


class TicTacToe extends React.PureComponent {
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

  componentWillMount() {}

  updateTile = (row, col) => () => {
    this.props.checkAndUpdateTile(row, col)
  }

  componentWillReceiveProps({isFinished}) {
    isFinished()
  }

  restartGame = () => {
    this.props.restartGame(this.props.gameState.size)
  }

  handleSubmit = e => {
    e.preventDefault()
    let val = parseInt(this.input.value, 10)
    // Could handle incorrect values some way
    if (isNaN(val) || val <= 0 || !val) return
    this.props.changeGridSize(val)
  }

  setInputRef = ref => {
    this.input = ref
  }

  render() {
    console.info('--- RENDERED')
    const {board, turn, done, isDraw, winner, size} = this.props.gameState
    const propForResComp = {isDraw, winner, size, restartGame: this.restartGame}

    return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-12">
              <h1 class="text-center">Titck tak toe simple game!</h1>
              <hr/>
              <h3>Change grid size</h3>
              <p>Current board grid is {size}</p>
              <form onSubmit={this.handleSubmit} class="form-inline">
                <div class="form-group">
                  <label for="exampleFormControlFile1">Type new grid size (number, highter 0)</label>
                  <input type="number" ref = {this.setInputRef} class="form-control mx-sm-3" id="exampleFormControlFile1" />
                  <button className="btn btn-dark" type="submit">Change size.</button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-12">
            {done && <Result {...propForResComp} />}
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
    )
  }
}

export default connect(state => {
  return {
    gameState: state.game
  }
}, {checkAndUpdateTile, isFinished, restartGame, changeGridSize})(TicTacToe)