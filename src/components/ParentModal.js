import React from 'react';
import './ParentModal.css';

class ParentModal extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name] : value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setParent(this.state);
    this.props.toggleModal();
  }

  render() {
    const { name, address } = this.state;
    const furbaby = this.props.furbaby;
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
          <div className="titleModal">Parent information for {furbaby}:</div>

          <input required type="text" name="name" value={name} onChange={this.handleChange}/>
          <div className="modal-text">Name</div>

          <input required type="text" name="address" value={address} onChange={this.handleChange}/>
          <div className="modal-text">Address</div>

          <button className='button' type="submit" value="submit">Submit</button>
                
          </form>
        </div>
      </div>
    );
  }
}

export default ParentModal;