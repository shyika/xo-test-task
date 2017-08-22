import React from 'react';

export default class Result extends React.Component {

  render() {
    const {isDraw, winner, size, restartGame} = this.props
    return (
      <div className="row">
        <div className="col-12">
          <div className="jumbotron">
            {
              (isDraw) ? (
                <h1>Game is draw!</h1>
              ) : (
                <div>
                  <h1 className="display-4 text-success">{winner} is won on the board <strong>{`${size} x ${size}`}</strong>!</h1>
                </div>
              )
            }
            <p className="lead">Click button below to restart game!</p>
            <p className="lead">
              <button role="buttton" onClick={restartGame} className="btn btn-primary btn-lg">Restart game.</button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
