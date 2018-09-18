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
    const target = event.target;
    const currentTarget = event.currentTarget;
    if (target.className === currentTarget.className) this.props.removeMsg();
  }

  render() {
    console.log(this.props)
    const flashMsg = this.props.flashMsg;
    if (flashMsg.length === 0) return null;
    return (
      <div className='backdrop' name='backdrop' onClick={this.handleClick}>
        <div className='flash-msg error'>
          {flashMsg}
        </div>
      </div>
    )
  }
}

const mapState = state => ({ flashMsg: state.flashMsg });

const mapDispatch = { removeMsg };

const FlashMsgContainer = connect(mapState, mapDispatch)(FlashMsg);
export default FlashMsgContainer;