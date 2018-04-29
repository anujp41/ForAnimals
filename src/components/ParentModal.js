import React from 'react';
import { connect } from 'react-redux';
import './ParentModal.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

class ParentModal extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
      showParents: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showParent = this.showParent.bind(this);
    this.renderParents = this.renderParents.bind(this);
    this.setParent = this.setParent.bind(this);
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

  showParent() {
    const showParents = !this.state.showParents;
    this.setState({ showParents });
  }

  setParent(parent) {
    this.showParent();
    this.props.setParent(parent);
    this.props.toggleModal();
  }

  renderParents() {
    const parents = this.props.parents;
    return (
      <div>
        <div className='parents'>Select parent from list below!</div>
          <ReactTable
            filterable
            data={parents}
            columns={[
              {
                Header: 'Name',
                accessor: 'name',
                filterMethod: (filter, row) => 
                  row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
              }, {
                Header: 'Address',
                accessor: 'address',
                filterMethod: (filter, row) => 
                  row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
              }
            ]}
            defaultPageSize={4} 
            minRows={0}
            className='-highlight parentItem'
            getTdProps={(state, rowInfo, column, instance) => {
              return { onClick: (e) => this.setParent(rowInfo.original) }
            }}
          />
      </div>
    )
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

          <div className="titleExisting" onClick={this.showParent}>Click here to select an existing parent</div>
          { this.state.showParents && this.renderParents() }

          <div className="titleOption">Or</div>

          <div className="titleModal">Add a new parent below: {furbaby}:</div>

          <input required className="input" type="text" name="name" value={name} onChange={this.handleChange}/>
          <div className="modal-text">Name</div>

          <input required className="input" type="text" name="address" value={address} onChange={this.handleChange}/>
          <div className="modal-text">Address</div>

          <button className='button' type="submit" value="submit">Submit</button>
                
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    parents: state.parents
  }
}

const ParentModalContainer = connect(mapState, null)(ParentModal);
export default ParentModalContainer;