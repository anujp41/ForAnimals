import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';
import sort from './SortFunc';
import FurbabyUpdateModal from './FurbabyUpdateModal';
import { assignCurrFurbaby, clearCurrFurbaby } from '../store';

class FurbabiesList extends Component {

  constructor() {
    super();
    this.state = {
      sort: false,
      sorting: null,
      sortOptions: {
        'Sort': ['Age: Oldest', 'Age: Youngest', 'Brought to Shelter: Most Recent', 'Brought to Shelter: Most Previous'],
        'Filter': ['Available', 'Fostered', 'Adopted', 'Has FIV', 'Is Spayed']
      },
      showUpdateModal: false
    }
    this.renderDropdown = this.renderDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
    this.renderUpdate = this.renderUpdate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.returnParentAddress = this.returnParentAddress.bind(this);
    this.handleScrolling = this.handleScrolling.bind(this);
  }

  handleClick(sortType) {
    this.setState({
      sort: true,
      sorting: sortType
    })
  }

  clear() {
    this.setState({sort: false, sorting: null})
  }

  toggleModal(furbaby) {
    if (furbaby && furbaby.age) {
      this.props.assignFurbaby(furbaby);
      this.setState({ showUpdateModal: !this.state.showUpdateModal });
    } else {
      this.setState({ showUpdateModal: !this.state.showUpdateModal });
    }
  }

  returnParentAddress(furbaby) {
    const { parent } = furbaby;
    return `${parent.street}, ${parent.city}, ${parent.state} ${parent.zip}`;
  }

  renderUpdate(furbaby) {
    return (
      <div onClick={()=>this.toggleModal(furbaby)}>
        <div className='update'>&#10247;</div>
        <div className='updateMsg'>Click to update!</div>
      </div>
    )
  }

  renderDropdown() {
    const sortOptions = this.state.sortOptions;
    const sorts = Object.keys(sortOptions);
    return (
      <div className='dropdown'>
          {sorts.map((sort, idx) => (
            <div key={idx} className='menu-title'>
              {sort}
              <div className='menu-dropdown'>
                {sortOptions[sort].map((option, i) => (
                    <div className='sortItem' key={i} onClick={() => this.handleClick(option)}>&#8605; {option}</div>
                ))}
              </div>
            </div>
          ))}
      </div>
    )
  }

  handleScrolling() {
    console.log('handle scroll');
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrolling);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrolling);
  }

  render() {
    let { furbabies } = this.props;
    if (this.state.sort) {
      furbabies = sort(furbabies, this.state.sorting);
    }
    console.log('first furbaby ', furbabies.slice(0, 5))
    return (
      <div className='mainContainer' onScroll={this.handleScrolling}>
        {this.state.sort && <div style={{backgroundColor: 'goldenrod', width: '75px'}} onClick={this.clear}>Clear!</div>}
        {this.renderDropdown()}
        <div className='furbabyDisplay'>
        {furbabies.map(furbaby => (
          <div key={furbaby.id} className='furbabyCard'>
            <div className='wrapper'>
            {this.renderUpdate(furbaby)}
              {furbaby.parentId 
              ?
                (furbaby.fostered
                ?
                <div className='good'>Fostered</div>
                : <div className='fivpositive'>Adopted</div>)
              : <div className='spayed'>Available</div>}
              
              <img alt="" className='furbabyPhoto' src={furbaby.photoUrl} />
              <div className='furbabyDetails'>
                <div className='furbabyInfo'>
                  <div className='furbabyName'><b>Name: </b>{furbaby.adoptedname || furbaby.shelterName}</div>
                  <div className='furbabyBreed'><b>Breed: </b>{furbaby.breed}</div>
                  <div className='furbabyAge'><b>Age: </b>{furbaby.age}</div>
                  <div className='furbabyArrived'><b>Arrived at shelter: </b>{furbaby.arrived}</div>
                  <div className='furbabySex'><b>Sex: </b>{furbaby.sex}</div>
                  <div className='furbabySpayed'><b>Spayed: </b>{furbaby.spayed ? 'Yes' : 'No'}</div>
                  <div className='furbabyFivpositive'><b>FIV Positive: </b>{furbaby.fivpositive ? 'Yes' : 'No'}</div>
                  <div className='furbabyComments'><b>Comments: </b>'None'</div>
                </div>
              {furbaby.parentId && 
                <div className='parentInfo'>
                  <div className='parentTitle'>{furbaby.fostered ? 'Fostered by;' : 'Adopted by:'}</div>
                  <div className='parentDetail'>
                    <div className='parentName'>{furbaby.parent.name}</div>
                    <div className='parentAddress'>{this.returnParentAddress(furbaby)}</div>
                  </div>
                </div>
              }
              </div>
            </div>
          </div>
        ))}
        </div>
        <FurbabyUpdateModal show={this.state.showUpdateModal} toggleModal={this.toggleModal}/>
      </div>
    )
  }
}

const mapState = state => {
  return {
    furbabies: state.furbabies
  }
}

const mapDispatch = dispatch => {
  return {
    assignFurbaby(furbaby) {
      dispatch(assignCurrFurbaby(furbaby));
    },
    clearFurbaby() {
      dispatch(clearCurrFurbaby());
    }
  }
}

const FurbabiesListContainer = connect(mapState, mapDispatch)(FurbabiesList);
export default FurbabiesListContainer;