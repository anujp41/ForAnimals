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
      parentId: '',
      parentAdd: null,
      parentSelect: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitNewParent = this.submitNewParent.bind(this);
    this.submitSelectParent = this.submitSelectParent.bind(this);
    this.renderParentList = this.renderParentList.bind(this);
    this.renderParentAddForm = this.renderParentAddForm.bind(this);
    this.setParentId = this.setParentId.bind(this);
    this.parentOptionClick = this.parentOptionClick.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name] : value });
  }

  submitNewParent(event) {
    event.preventDefault();
    this.props.setParent(this.state.name, this.state.address);
    this.props.toggleModal();
  }

  submitSelectParent() {
    const parentId = this.state.parentId;
    this.props.setParentId({parentId});
    this.props.toggleModal();
  }

  setParentId(parent) {
    this.setState({parentId: parent.id})
  }

  parentOptionClick(option) {
    let parentAdd = null;
    let parentSelect = null;
    console.log('option ', option)
    if (option === 'parentAdd') {
      parentAdd = true;
      parentSelect = false;
    }
    if (option === 'parentSelect') {
      parentAdd = false;
      parentSelect = true;
    }
    this.setState({parentAdd, parentSelect});
  }

  renderParentList() {
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
            className='-striped parentItem'
            getTdProps={(state, rowInfo, column, instance) => {
              return { 
                onClick: (e) => this.setParentId(rowInfo.original),
                style: {
                  background: rowInfo.original.id === this.state.parentId ? '#26ada8' : '#cae599'
                }}
            }}
          />
          <button className='button' onClick={this.submitSelectParent}>Submit</button>
      </div>
    )
  }

  renderParentAddForm() {
    const { name, address } = this.state;
    const { furbaby } = this.props;
    return (
      <div className="titleModal">Add a new parent below for {furbaby}:
        <form autoComplete="off" onSubmit={this.submitNewParent}>
          <div className='parentName'>
            <div className="modal-text">Parent Name:</div>
            <input required className="input" type="text" maxLength='75' name="name" value={name} onChange={this.handleChange}/>              
          </div>

          <div className='parentAddress'>
            <div className="modal-text">Parent Address:</div>
            <input required className="input" type="text" name="address" value={address} onChange={this.handleChange}/>
          </div>
          <button className='button' type="submit" value="submit">Submit</button>
        </form>
      </div>
    )
  }

  render() {
    const { furbaby } = this.props;
    if(!this.props.show) {
      return null;
    }

    return (
      <div className='backdrop'>
        <button className='cancelbtn' onClick={()=>this.props.toggleModal(false)}>Cancel</button>
        <div className='containerModal'>

          <div className="titleExisting">To add a parent for {furbaby}, choose from below:</div>

          <div className='parentOptions'>
            <div className='parentAdd' onClick={()=>this.parentOptionClick('parentAdd')}>Add Parent</div>
            <div className='parentSelect' onClick={()=>this.parentOptionClick('parentSelect')}>Select Existing Parent</div>
          </div>

          {this.state.parentAdd && this.renderParentAddForm()}
          {this.state.parentSelect && this.renderParentList()}
                
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