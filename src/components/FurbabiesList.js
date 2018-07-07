import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';
import FurbabyDetailModal from './FurbabyDetailModal';
import FurbabyUpdateModal from './FurbabyUpdateModal';
import { assignCurrFurbaby, clearCurrFurbaby, getFurbabiesThunk, getFilterThunk, removeFilter, getFurbabyThunk } from '../store';
import debouce from 'debounce';
const { currentStatusVals } = require('../assets');

class FurbabiesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sort: false,
      sorting: null,
      sortOptions: {
        'Sort': ['Age: Oldest', 'Age: Youngest', 'Brought to Shelter: Most Recent', 'Brought to Shelter: Most Previous'],
        'Filter': currentStatusVals.slice(1) //slicing as first val is 'Choose from List:'
      },
      showDetail: false,
      currIndex: 0 // tracks the current number of furbabies displayed to user
    }
    this.renderDropdown = this.renderDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.returnParentAddress = this.returnParentAddress.bind(this);
    this.handleScrolling = debouce(this.handleScrolling.bind(this), 50);
    this.getAge = this.getAge.bind(this);
    this.getDate = this.getDate.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  closeModal() {
    this.setState({ showDetail: false })
  }

  toggleModal(method) {
    if (method==='detail') {
      this.setState ({ showDetail: false })
    }
    // if (furbaby && furbaby.age) {
    //   this.props.assignFurbaby(furbaby);
    //   this.setState({ showUpdate: !this.state.showUpdate });
    // } else {
    //   this.setState({ showUpdate: !this.state.showUpdate });
    // }
  }

  returnParentAddress(furbaby) {
    const { parent } = furbaby;
    return `${parent.street}, ${parent.city}, ${parent.state} ${parent.zip}`;
  }

  getAge(input) {
    const date = new Date(input);
    const today = new Date();
    const [todayYear, todayMonth] = [today.getFullYear(), today.getMonth()];
    const [dateYear, dateMonth] = [date.getFullYear(), date.getMonth()];
    let [diffYear, diffMonth] = [todayYear-dateYear, todayMonth-dateMonth];
    if (diffMonth < 0) {
      diffMonth = 12 + diffMonth;
      diffYear--;
    }
    return `${diffYear}y, ${diffMonth}m`
  }
  
  getDate(input) {
    const date = new Date(input);
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
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
    if (targetElement.getBoundingClientRect().bottom-window.innerHeight < 1500) { //1500 chosen as this is equivalent to height of 3 rows
      this.props.getFurbabiesThunk(this.state.currIndex)
    };
  }

  handleSelect(idx) {
    this.props.getFurbabyThunk(idx);
    this.setState({ showDetail: true });
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
    const furbaby = furbabies.length && furbabies[10];
    return (
      <div>
        {this.state.sort && <div className='clear-btn' onClick={this.clear}>Clear</div>}
        {this.renderDropdown()}
        <div className='mainContainer' id='furbaby-display'>
        {furbabies.map((furbaby, idx) => (
          <div key={idx} className='furbabyCard'>
            <div className='wrapper' onClick={()=>this.handleSelect(furbaby.id)}>
            <div className='currentStatus-List' name={furbaby.currentStatus}>{furbaby.currentStatus}</div>
              <img alt="" className='furbabyPhoto' src={furbaby.photoUrl}/>
              <div className='furbabyInfo'>
                <div><span className='label'>Name: </span><span className='text-name'>{furbaby.adoptedName || furbaby.shelterName}</span></div>
                <div><span className='label'>Age: </span><span className='text'>{this.getAge(furbaby.birthDate)}</span></div>
                <div><span className='label'>Breed: </span><span className='text'>{furbaby.breed}</span></div>
                <div><span className='label'>Gender: </span><span className='text'>{furbaby.gender}</span></div>
                <div><span className='label'>Color: </span><span className='text'>{furbaby.coatColor}</span></div>
                <div><span className='label'>Intake Date: </span><span className='text'>{this.getDate(furbaby.intakeDate)}</span></div>
                {Number.isInteger(furbaby.parentId) && <div><span className='label'>Parent Name: </span><span className='text'>{furbaby.parent.name}</span></div>}
              </div>
              <div className='furbabyClick'>Click for more details</div>
            </div>
          </div>
        ))}
        </div>
        {this.state.showDetail && <FurbabyDetailModal closeModal={this.closeModal}/>}
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

const mapDispatch = { getFurbabiesThunk, getFilterThunk, removeFilter, getFurbabyThunk };

const FurbabiesListContainer = connect(mapState, mapDispatch)(FurbabiesList);
export default FurbabiesListContainer;