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
    this.renderParentList = this.renderParentList.bind(this);
    this.renderParentAddForm = this.renderParentAddForm.bind(this);
    this.setParentId = this.setParentId.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name] : value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.setParent(this.state.name, this.state.address);
    this.props.toggleModal();
  }

  showParent() {
    const showParents = !this.state.showParents;
    this.setState({ showParents });
  }

  setParentId(parent) {
    console.log('parent is ', parent)
    // this.showParent();
    this.setState({parentId: parent.id})
    this.props.setParentId(parent.id);
    // this.props.toggleModal();
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
            defaultPageSize={5} 
            minRows={0}
            className='-striped parentItem'
            getTdProps={(state, rowInfo, column, instance) => {
              return { 
                onClick: (e) => this.setParentId(rowInfo.original),
                style: {
                  background: rowInfo.original.id === this.state.parentId ? '#26ada8' : '#7dad26'
                }}
            }}
          />
      </div>
    )
  }

  renderParentAddForm() {
    const { name, address } = this.state;
    const { furbaby } = this.props;
    return (
      <div className="titleModal">Add a new parent below for {furbaby}:
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className='parentName'>
            <div className="modal-text">Parent Name:</div>
            <input required className="input" type="text" maxLength='75' name="name" value={name} onChange={this.handleChange}/>              
          </div>

          <div className='parentAddress'>
            <div className="modal-text">Parent Address:</div>
            <input required className="input" type="text" name="address" value={address} onChange={this.handleChange}/>
          </div>
        </form>
      </div>
    )
  }

  render() {
    const { name, address } = this.state;
    const { furbaby } = this.props;
    if(!this.props.show) {
      return null;
    }

    return (
      <div className='backdrop'>
        <button className='cancelbtn' onClick={()=>this.props.toggleModal(false)}>Cancel</button>
        <div className='containerModal'>

          <div className="titleExisting">To add a parent for #{furbaby.name}, choose from below:</div>

          <div className='parentOptions'>
            <div className='parentAdd'>Add Parent</div>
            <div className='parentSelect'>Select Existing Parent</div>
          </div>

          <button className='button' type="submit" value="submit">Submit</button>
                
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