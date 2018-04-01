import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';

//Random Cat Photo => http://thecatapi.com/api/images/get?format=src&type=jpg
//Random User Photo => https://randomuser.me/api/?inc=picture

class FurbabiesList extends Component {

  render() {
    const { furbabies } = this.props;
    const furbaby = furbabies[0];
    const {id, name, breed } = furbaby;
    const imgSrc = 'http://thecatapi.com/api/images/get?format=src&type=jpg';
    return (
      <div className='mainContainer'>
        {furbabies.map(furbaby =>
          <div key={furbaby.id} className='furbabyContainer'>
            <img className='furbabyImage' src={imgSrc} />
            <div className='furbabyName'><b>Name:</b>{furbaby.name}</div>
            <div className='furbabyBreed'><b>Breed:</b>{furbaby.breed}</div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    furbabies: state.furbabies
  }
}

// const mapDispatch = dispatch => {
//   return {
//     submit(info) {
//       console.log('dispatching')
//       dispatch(updateFosterThunk(info))
//     }
//   }
// }

const FurbabiesListContainer = connect(mapState, null)(FurbabiesList);
export default FurbabiesListContainer;