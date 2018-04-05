import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';

class FurbabiesList extends Component {

  render() {
    const { furbabies } = this.props;
    const furbaby = furbabies[0];
    console.log('baby is ', furbaby);
    return (
      <div className="mainContainer">
        <img alt="" className='furbabyImage' src={furbaby.photoUrl} />
        <div className='furbabyName'><b>Name:</b>{furbaby.name}</div>
        <div className='furbabyBreed'><b>Breed:</b>{furbaby.breed}</div>
      </div>
      // <div className='mainContainer'>
      //   {furbabies.map(furbaby =>
      //     <div key={furbaby.id} className='furbabyContainer'>
      //       <img alt="" className='furbabyImage' src={furbaby.photoUrl} />
      //       <div className='furbabyName'><b>Name:</b>{furbaby.name}</div>
      //       <div className='furbabyBreed'><b>Breed:</b>{furbaby.breed}</div>
      //     </div>
      //   )}
      // </div>
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