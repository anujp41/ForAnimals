import React from 'react';
import { connect } from 'react-redux';
import './ParentModal.css';
import ReactTable from "react-table";
import "react-table/react-table.css";

const states = require('../assets/statesList');

class ParentModal extends React.Component {

  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      parentAdd: null,
      parentSelect: null,
      adoptionDate: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitParent = this.submitParent.bind(this);
    this.renderParentList = this.renderParentList.bind(this);
    this.renderParentAddForm = this.renderParentAddForm.bind(this);
    this.renderAdoptionDate = this.renderAdoptionDate.bind(this);
    this.setParentId = this.setParentId.bind(this);
    this.parentOptionClick = this.parentOptionClick.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.groupAddress = this.groupAddress.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name] : value });
  }

  clearState() {
    const defaultState = {
      id: '', name: '',
      street: '', 
      city: '',
      state: '',
      zip: '',
      parentAdd: null,
      parentSelect: null,
      adoptionDate: ''
    };
    this.setState({ ...defaultState });
  }

  handleDropdown(state) {
    this.setState({state})
  }

  submitParent(event) {
    event.preventDefault();
    if (states.indexOf(this.state.state) === -1) {
      alert("Please select state from the dropdown list");
      return;
    }
    const {id, name, street, city, state, zip} = this.state;
    this.props.setParent({id, name, street, city, state, zip});
    this.props.toggleModal();
  }

  setParentId(parent) {
    const {id, name, street, city, state, zip } = parent;
    this.setState({ id, name, street, city, state, zip })
  }

  parentOptionClick(option) {
    this.clearState();
    let parentAdd = null;
    let parentSelect = null;
    if (option === 'parentAdd') {
      parentAdd = true;
      parentSelect = false;
    }
    if (option === 'parentSelect') {
      parentAdd = false;
      parentSelect = true;
    }
    this.setState({ parentAdd, parentSelect });
  }
  
  groupAddress(item) {
    return `${item.street}, ${item.city}, ${item.state} ${item.zip}`;
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
                maxWidth: 275,
                filterMethod: (filter, row) => 
                  row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
              }, {
                id: 'parentAddress',
                Header: 'Address',
                accessor: parentInfo => this.groupAddress(parentInfo),
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
                  background: rowInfo.original.id === this.state.id ? '#26ada8' : '#cae599'
                }}
            }}
          />
          {this.renderAdoptionDate()}
          <button className='button' onClick={this.submitParent}>Submit</button>
      </div>
    )
  }

  renderParentAddForm() {
    const { name, street, city, state, zip } = this.state;
    const { furbaby } = this.props;
    return (
      <div className="titleModal">Add a new parent below for {furbaby}:
        <form autoComplete="nada" onSubmit={this.submitParent}>

          <div className='parentName'>
            <div className="modal-text">Parent Name:</div>
            <input required className="input" type="text" maxLength='75' name="name" value={name} onChange={this.handleChange}/>              
          </div>

          <div className='parentAddress'>

            <div className="modal-text modal-text-address">Parent Address:</div>

              <div className="parentAddressItem">
                <label className="input-label" htmlFor="address">Street: </label>
                <input required className="input" type="text" name="street" value={street} onChange={this.handleChange}/>
              </div>

              <div className="parentAddressItem">
                <label className="input-label" htmlFor="address">City: </label>
                <input required className="input" type="text" name="city" value={city} onChange={this.handleChange}/>
              </div>

              <div className="parentAddressItem">

                <div className="state">
                  <label className="input-label input-label-state" for="state">State: </label>
                  <select required name='state' className='stateList' value={state} onChange={this.handleChange}>
                    {states.map((val, idx) => <option key={idx} className='stateOption'>{val}</option>)}
                  </select>
                </div>

                <div className="zip">
                  <label className="input-label" htmlFor="address">Zipcode: </label>
                  <input required className="input" type="text" name="zip" value={zip} onChange={this.handleChange}/>
                </div>

              </div>

            {this.renderAdoptionDate()}
          </div>
          <button className='button' type="submit" value="submit">Submit</button>
        </form>
      </div>
    )
  }

  renderAdoptionDate() {
    const {adoptionDate} = this.state;
    const today = new Date().toISOString().split('T')[0];
    return (
      <div className='adoptionDate'>
        <label className="input-label" htmlFor="adoptionDate">Date of Adoption: </label>
        <input required type="date" name="adoptionDate" value={adoptionDate} max={today} onChange={this.handleChange}/>
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