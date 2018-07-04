import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';
import sort from './SortFunc';
import FurbabyUpdateModal from './FurbabyUpdateModal';
import { assignCurrFurbaby, clearCurrFurbaby, getFurbabiesThunk, getFilterThunk, removeFilter } from '../store';
import debouce from 'debounce';
const { currentStatusVals } = require('../assets');

class FurbabiesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sort: false,
      sorting: null,
      sortOptions: {
        // 'Sort': ['Age: Oldest', 'Age: Youngest', 'Brought to Shelter: Most Recent', 'Brought to Shelter: Most Previous'],
        'Filter': currentStatusVals.slice(1) //slicing as first val is 'Choose from List:'
      },
      showUpdateModal: false,
      currIndex: 0
    }
    this.renderDropdown = this.renderDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
    this.renderUpdate = this.renderUpdate.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.returnParentAddress = this.returnParentAddress.bind(this);
    this.handleScrolling = debouce(this.handleScrolling.bind(this), 50);
  }

  handleClick(sortType) {
    this.setState({
      sort: true
    })
    this.props.getFilterThunk(sortType);
  }

  clear() {
    this.setState({sort: false});
    this.props.removeFilter();
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
    const targetElement = document.getElementById('furbaby-display');
    const cardHeight = 575;
    const { currIndex } = this.state;
    if (targetElement.getBoundingClientRect().bottom-window.innerHeight < 1500) { //1500 chosen as this is equivalent to height of 3 rows
      this.props.getFurbabiesThunk(this.state.currIndex)
    };
  }

  componentDidUpdate() {
    const { currIndex } = this.state;
    const { furbabies } = this.props;
    if (currIndex !== furbabies.length) {
      this.setState({ currIndex: this.props.furbabies.length});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.furbabies !== nextProps.furbabies) {
      return true;
    }
    if (this.props.filterResult !== nextProps.filterFurbaby) {
      return true;
    }
    // if (this.state !== nextState) {
    //   return true;
    // }
    return false;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrolling);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrolling);
  }

  render() {
    let furbabies = !this.state.sort ? this.props.furbabies : this.props.filterResult;
    // let { furbabies } = this.props;
    // if (this.state.sort) {
    //   furbabies = sort(furbabies, this.state.sorting);
    // }
    console.log('furbabies: ', furbabies);
    return (
      <div>
        {this.state.sort && <div style={{backgroundColor: 'goldenrod', width: '75px'}} onClick={this.clear}>Clear!</div>}
        {this.renderDropdown()}
        <div className='mainContainer' id='furbaby-display'>
        {furbabies.map((furbaby, idx) => (
          <div key={idx} className='furbabyCard'>
            <div className='wrapper'>
            {this.renderUpdate(furbaby)}
            <div className='currentStatus-List' name={furbaby.currentStatus}>{furbaby.currentStatus}</div>
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
    furbabies: state.furbabies,
    filterResult: state.filterFurbaby
  }
}

const mapDispatch = { getFurbabiesThunk, getFilterThunk, removeFilter };

// const mapDispatch = dispatch => {
//   return {
//     assignFurbaby(furbaby) {
//       dispatch(assignCurrFurbaby(furbaby));
//     },
//     clearFurbaby() {
//       dispatch(clearCurrFurbaby());
//     }
//   }
// }

const FurbabiesListContainer = connect(mapState, mapDispatch)(FurbabiesList);
export default FurbabiesListContainer;