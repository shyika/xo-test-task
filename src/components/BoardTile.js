import React from 'react';

export default class GameTile extends React.Component {

  transformVal(v) {
    let val = ''
    if (v === 1) val = 'X'
    if (v === -1) val = 'O'
    return val
  }

  render() {
    const {row, col, val, updateTile} = this.props
    const tV = this.transformVal(val)
    return (
      <td onClick={updateTile(row, col, val)}  data-row={row} data-col={col}>
        {tV}
      </td>
    )
  }
}