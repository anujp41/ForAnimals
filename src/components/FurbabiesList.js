import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';
import $ from 'jquery';

class FurbabiesList extends Component {

  // componentDidMount() {
  //   $('.furbabyCard').mouseenter(function(event) {
  //     $(event.currentTarget).find('.furbaby').css('transform', 'translateY(-25px)');
  //   });
  //   $('.furbabyCard').mouseleave(function(event) {
  //     $(event.currentTarget).find('.furbaby').css('transform', 'translateY(25px)');
  //   });
  // }

  render() {
    const { furbabies } = this.props;
    const furbaby = furbabies[7];
    console.log('this is  ', furbaby)
    return (
      <div className='mainContainer'>
      {/* {furbabies.map(furbaby => ( */}
        <div key={furbaby.id} className='furbabyCard'>
          <div className='wrapper'>
            <img alt="" src={furbaby.photoUrl} />
            <div className='furbabyDetails'>
              <div className='furbabyName'><b>Name: </b>{furbaby.name}</div>
              <div className='furbabyBreed'><b>Breed: </b>{furbaby.breed}</div>
              <div className='furbabyAge'><b>Age: </b>{furbaby.age}</div>
              <div className='furbabySex'><b>Sex: </b>{furbaby.sex}</div>
              <div className='furbabySpayed'><b>Spayed: </b>{furbaby.spayed ? 'Yes' : 'No'}</div>
              <div className='furbabyFivpositive'><b>FIV Positive: </b>{furbaby.fivpositive ? 'Yes' : 'No'}</div>
              <div className='furbabyComments'><b>Comments: </b>{furbaby.comments}</div>
            </div>
          </div>
        </div>
        {/* ))} */}
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