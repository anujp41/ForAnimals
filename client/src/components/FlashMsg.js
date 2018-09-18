import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FlashMsg.css';

class FlashMsg extends Component {

  constructor() {
    super();
  }

  render() {
    const flashMsg = this.props.flashMsg;
    if (flashMsg.length === 0) return null;
    return (
      <div className='flash-msg info'>
        {flashMsg}
      </div>
    )
  }
}

const mapState = state => {
  return {
    flashMsg: state.flashMsg
  }
}

const FlashMsgContainer = connect(mapState, null)(FlashMsg);
export default FlashMsgContainer;