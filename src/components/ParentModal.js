import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './ParentModal.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
const { states } = require('../assets');

class ParentModal extends React.Component {

  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      street: '',
      city: '',
      state: 'Select:',
      zip: '',
      parentAdd: false,
      parentSelect: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitParent = this.submitParent.bind(this);
    this.renderParentList = this.renderParentList.bind(this);
    this.renderParentAddForm = this.renderParentAddForm.bind(this);
    this.setParentId = this.setParentId.bind(this);
    this.parentOptionClick = this.parentOptionClick.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.groupAddress = this.groupAddress.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { parentInfo } = nextProps;
    return parentInfo ? { ...parentInfo } : null;
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name] : value, id: null });
  }

  clearState() {
    const defaultState = {
      id: '', 
      name: '',
      street: '', 
      city: '',
      state: 'Select:',
      zip: '',
      parentAdd: null,
      parentSelect: null
    };
    this.setState({ ...defaultState });
  }

  handleDropdown(state) {
    this.setState({state})
  }

  submitParent(event) {
    event.preventDefault();
    if (states.indexOf(this.state.state) === -1) {
      alert('Please select state from the dropdown list');
      return;
    }
    const {parentAdd, parentSelect, furbabyName, ...parentInfo} = this.state;
    this.props.setParent(parentInfo, furbabyName);
    this.props.toggleModal(false);
  }

  setParentId(parent) {
    const {createdAr, updatedAr, hasFoster, ...parentInfo} = parent;
    this.setState({ ...parentInfo });
  }

  parentOptionClick(option) {
    // this.clearState();
    let parentAdd = false;
    let parentSelect = false;
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
        <form onSubmit={this.submitParent}>
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
          <button className='button button-parent'>Submit</button>
        </form>
      </div>
    )
  }

  renderParentAddForm() {
    const { name, street, city, state, zip } = this.state;
    return (
      <div>
        <form autoComplete='nada' onSubmit={this.submitParent}>

          <div className='parentName'>
            <div className='modal-text'>Parent Name:</div>
            <input required className='input' type='text' maxLength='75' name='name' value={name} onChange={this.handleChange}/>              
          </div>

          <div className='parentAddress'>

            <div className='modal-text'>Parent Address:</div>

              <div className='parentAddressItem'>
                <label className='input-label' htmlFor='address'>Street: </label>
                <input required className='input' type='text' name='street' value={street} onChange={this.handleChange}/>
              </div>

              <div className='parentAddressItem'>
                <label className='input-label' htmlFor='address'>City: </label>
                <input required className='input' type='text' name='city' value={city} onChange={this.handleChange}/>
              </div>

              <div className='parentAddressItem'>

                <div className='state'>
                  <label className='input-label input-label-state' htmlFor='state'>State: </label>
                  <select required name='state' className='stateList' value={state} onChange={this.handleChange}>
                    {states.map((val, idx) => <option key={idx} disabled={val==='Select:'} className='stateOption'>{val}</option>)}
                  </select>
                </div>

                <div className='zip'>
                  <label className='input-label' htmlFor='address'>Zipcode: </label>
                  <input required className='input' type='text' name='zip' value={zip} onChange={this.handleChange}/>
                </div>
              </div>
          </div>

          <button className='button button-parent' type='submit' value='submit'>Submit</button>

        </form>
      </div>
    )
  }

  render() {
    const { furbabyName } = this.props;
    if(!this.props.show) {
      return null;
    }
    return (
      <div className='backdrop'>
        <button className='cancelbtn' onClick={()=>this.props.toggleModal(false, 'cancelled')}>Cancel</button>
        <div className='containerModal'>

          <div className='titleExisting'>To add a parent for {furbabyName}, choose from below:</div>

          <div className='parentOptions'>
            <div className='parentAdd' onClick={()=>this.parentOptionClick('parentAdd')}>{this.state.parentId ? 'Update Parent' : 'Add Parent'}</div>
            <div className='parentSelect' onClick={()=>this.parentOptionClick('parentSelect')}>Select Existing Parent</div>
          </div>

          {this.state.parentAdd && this.renderParentAddForm()}
          {this.state.parentSelect && this.renderParentList()}
                
        </div>
      </div>
    );
  }
}

ParentModal.propTypes = {
  furbabyName: PropTypes.string.isRequired,
  parents: PropTypes.arrayOf(PropTypes.object),
  show: PropTypes.bool.isRequired,
  parentInfo: PropTypes.object
}

const mapState = state => {
  return {
    parents: state.parents
  }
}

const ParentModalContainer = connect(mapState, null)(ParentModal);
export default ParentModalContainer;