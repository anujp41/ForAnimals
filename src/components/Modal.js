import React from 'react';
import './Modal.css';
import { Parent } from './index';

class Modal extends React.Component {
  render() {
    if(!this.props.show) {
      return null;
    }

  return (
      <div className='backdrop'>
        <div className='modal'>
          <h2>Welcome to modal</h2>
          <button onClick={this.props.toggleModal} style={{backgroundColor: 'red'}}>
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;