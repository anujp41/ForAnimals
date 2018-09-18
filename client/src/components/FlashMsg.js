import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FlashMsg.css';
import { removeMsg } from '../store';

class FlashMsg extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.className === event.currentTarget.className) this.props.removeMsg();
  }

  render() {
    const flashMsg = this.props.flashMsg;
    const {code, msgStmt} = flashMsg;
    if (msgStmt.length === 0) return null;
    return (
      <div className='backdrop' name='backdrop' onClick={this.handleClick}>
        <div className={`flash-msg ${code}`}>
          {msgStmt}
        </div>
      </div>
    )
  }
}

const mapState = state => ({ flashMsg: state.flashMsg });

const mapDispatch = { removeMsg };

const FlashMsgContainer = connect(mapState, mapDispatch)(FlashMsg);
export default FlashMsgContainer;