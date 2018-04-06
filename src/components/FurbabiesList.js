import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';

class FurbabiesList extends Component {

  render() {
    const { furbabies } = this.props;
    const furbaby = furbabies[0];
    return (
      <div className='mainContainer'>
      {furbabies.map(furbaby => (
        <div className='furbabyCard'>
          <div className='wrapper'>
            <img alt="" src={furbaby.photoUrl} />
            <div className='furbaby'>
              <div className='furbabyDetails'>
                <div className='furbabyName'><b>Name: </b>{furbaby.name}</div>
                <div className='furbabyBreed'><b>Breed: </b>{furbaby.breed}</div>
              </div>
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