import React from 'react';
import './ParentModal.css';
import { ParentModal } from './index';

class Modal extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      address: ''
    }
  }

  render() {
    const { name, address } = this.state;
    if(!this.props.show) {
      return null;
    }

  return (
      <div className='backdrop'>
        <button className='cancelbtn' onClick={this.props.toggleModal}>
          Cancel
        </button>
        <div className='containerModal'>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="titleModal">New parent information for :</div>

          <input required type="text" name="name" value={name} onChange={this.handleChange}/>
          <div className="modal-text">Name</div>

          <input required type="text" name="address" value={address} onChange={this.handleChange}/>
          <div style={{paddingBottom: '75px'}} className="modal-text">Address</div>

          <button className='button' hidden={this.props.button} type="submit" value="submit">Submit</button>
                
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;