import React from 'react';
import { connect } from 'react-redux';
import './ParentModal.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Autocomplete from 'react-autocomplete';

const states = require('../assets/statesList');

class ParentModal extends React.Component {

  constructor() {
    super();
    this.state = {
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      parentId: '',
      parentAdd: null,
      parentSelect: null,
      adoptionDate: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitNewParent = this.submitNewParent.bind(this);
    this.submitSelectParent = this.submitSelectParent.bind(this);
    this.renderParentList = this.renderParentList.bind(this);
    this.renderParentAddForm = this.renderParentAddForm.bind(this);
    this.renderAdoptionDate = this.renderAdoptionDate.bind(this);
    this.setParentId = this.setParentId.bind(this);
    this.parentOptionClick = this.parentOptionClick.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name] : value });
  }

  handleDropdown(state) {
    this.setState({state})
  }

  submitNewParent(event) {
    event.preventDefault();
    if (this.state.state.length !==2) {
      alert("Please select state from the dropdown list");
      return;
    }
    this.props.setParent(this.state.name, this.state.address);
    this.props.toggleModal();
  }

  submitSelectParent() {
    const {parentId} = this.state;
    this.props.setParentId({parentId});
    this.props.toggleModal();
  }

  setParentId(parent) {
    this.setState({parentId: parent.id})
  }

  parentOptionClick(option) {
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
          {this.renderAdoptionDate()}
          <button className='button' onClick={this.submitSelectParent}>Submit</button>
      </div>
    )
  }

  renderParentAddForm() {
    const { name, street, city, state, zip } = this.state;
    const { furbaby } = this.props;
    return (
      <div className="titleModal">Add a new parent below for {furbaby}:
        <form autoComplete="nada" onSubmit={this.submitNewParent}>
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
              <div className="parentAddressItem state-zip">
                <div className="state">
                  <label className="input-label" htmlFor="state">State: </label>
                  <Autocomplete
                    readonly
                    items={states}
                    getItemValue={item => item}
                    value={state}
                    onSelect={value => this.handleDropdown(value)}
                    onChange={event => this.handleDropdown(event.target.value)}
                    renderItem={(item, highlighted) => 
                      <div 
                        className="stateList"
                        key={item}
                        style={{ backgroundColor: highlighted ? '#a59898' : 'transparent'}}
                        >{item}
                      </div>
                    }
                    />
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