import React, { Component } from "react";
import { connect } from "react-redux";
import './ParentsList.css';

class ParentsList extends Component {

  render() {
    const { parents } = this.props;
    return (
      <div className='mainParentContainer'>
        {parents.map(parent =>
          <div key={parent.id} className='parentContainer'>
            {/* <img className='parentImage' src={imgSrc.results[0].picture.large} /> */}
            <div className='parentName'><b>Name: </b>{parent.name}</div>
            <div className='parentAddress'><b>Address: </b>{parent.address}</div>
            <div className='parentHasFoster'><b>Currently fostering: </b>{parent.hasFoster ? 'Yes' : 'No'}</div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    parents: state.parents
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

const ParentsListContainer = connect(mapState, null)(ParentsList);
export default ParentsListContainer;