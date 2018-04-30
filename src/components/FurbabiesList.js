import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';
import sort from './SortFunc';

class FurbabiesList extends Component {

  constructor() {
    super();
    this.state = {
      sort: false,
      sorting: null,
      sortOptions: {
        'Sort': ['Age: Oldest', 'Age: Youngest', 'Brought to Shelter: Most Recent', 'Brought to Shelter: Most Previous'],
        'Filter By': ['Available', 'Fostered', 'Adopted', 'Has FIV', 'Is Spayed']
      }
    }
    this.renderDropdown = this.renderDropdown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clear = this.clear.bind(this);
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

  render() {
    let { furbabies } = this.props;
    if (this.state.sort) {
      furbabies = sort(furbabies, this.state.sorting);
    }
    return (
      <div className='mainContainer'>
        {this.state.sort && <div style={{backgroundColor: 'goldenrod', width: '75px'}} onClick={this.clear}>Clear!</div>}
        {this.renderDropdown()}
      {furbabies.map(furbaby => (
        <div key={furbaby.id} className='furbabyCard'>
          <div className='wrapper'>
            {furbaby.parentId 
            ?
              (furbaby.fostered
              ?
              <div className='good'>
                Fostered
              </div>
              :
              <div className='fivpositive'>
                Adopted
              </div>
              )
            :
            <div className='spayed'>
              Available
            </div>
            }
            <img alt="" src={furbaby.photoUrl} />
            <div className='furbabyDetails'>
              <div className='furbabyInfo'>
                <div className='furbabyName'><b>Name: </b>{furbaby.name}</div>
                <div className='furbabyBreed'><b>Breed: </b>{furbaby.breed}</div>
                <div className='furbabyAge'><b>Age: </b>{furbaby.age}</div>
                <div className='furbabyArrived'><b>Arrived at shelter: </b>{furbaby.arrived}</div>
                <div className='furbabySex'><b>Sex: </b>{furbaby.sex}</div>
                <div className='furbabySpayed'><b>Spayed: </b>{furbaby.spayed ? 'Yes' : 'No'}</div>
                <div className='furbabyFivpositive'><b>FIV Positive: </b>{furbaby.fivpositive ? 'Yes' : 'No'}</div>
                <div className='furbabyComments'><b>Comments: </b>{furbaby.comments.length ? furbaby.comments : 'None'}</div>
              </div>
              {furbaby.parentId && 
                <div className='parentInfo'>
                  <div className='parentTitle'>{furbaby.fostered ? 'Foster' : 'Parent'}</div>
                  <div className='parentName'>{furbaby.parent.name}</div>
                  <div className='parentAddress'>{furbaby.parent.address}</div>
                </div>
              }
            </div>
          </div>
        </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    furbabies: state.furbabies
  }
}

const FurbabiesListContainer = connect(mapState, null)(FurbabiesList);
export default FurbabiesListContainer;