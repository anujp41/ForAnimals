import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';
// import $ from 'jquery';
import sort from './SortFunc';

class FurbabiesList extends Component {

  constructor() {
    super();
    this.state = {
      sort: false,
      sorting: null,
      sortOptions: {
        'Sort': ['Age: Oldest', 'Age: Youngest', 'Date Added: Descending', 'Date Added: Ascending'],
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
            <div key={idx} className='dropdown-title'>
              <div className="menu-title">{sort}</div>
              <div className="menu-dropdown">
                <ul className='hList'>
                  {sortOptions[sort].map((option, i) => (
                      <li key={i} onClick={() => this.handleClick(option)}>{option}</li>
                  ))}
                </ul>
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
              <div className='furbabyName'><b>Name: </b>{furbaby.name}</div>
              <div className='furbabyBreed'><b>Breed: </b>{furbaby.breed}</div>
              <div className='furbabyAge'><b>Age: </b>{furbaby.age}</div>
              <div className='furbabySex'><b>Sex: </b>{furbaby.sex}</div>
              <div className='furbabySpayed'><b>Spayed: </b>{furbaby.spayed ? 'Yes' : 'No'}</div>
              <div className='furbabyFivpositive'><b>FIV Positive: </b>{furbaby.fivpositive ? 'Yes' : 'No'}</div>
              <div className='furbabyComments'><b>Comments: </b>{furbaby.comments.length ? furbaby.comments : 'None'}</div>
              {furbaby.parentId && 
                <div className='parentInfo'>
                  <div className='parentTitle'>Parent:</div>
                  <div className='parentName'><b>Name: </b>{furbaby.parent.name}</div>
                  <div className='parentAddress'><b>Address: </b>{furbaby.parent.address}</div>
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