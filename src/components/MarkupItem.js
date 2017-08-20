import React from 'react';

class MarkupItem extends React.Component {

  render() {
  	const {val, pos, turn, updateItem, cl} = this.props
    return (
      <div onClick={updateItem(pos, turn)} className={`col-4 col-sm-4 item ${cl} ${pos}`}>
      	{val}
      </div>
    );
  }
}

export default MarkupItem