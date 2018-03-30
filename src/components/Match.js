import React, { Component } from "react";
import { connect } from "react-redux";
import './Match.css';

class Match extends Component {

  render() {
    const { furbabies, parents } = this.props;
    console.log('furbabies ', furbabies);
    console.log('parents ', parents);
    return (
      <div className="matchContainer">
        <select>
          {furbabies.length && furbabies.map(furbaby => <option>{furbaby.name}</option>)}
        </select>


        <select>
          {parents.length && parents.map(parent => <option>{parent.name}</option>)}
        </select>

        <button type="submit" value="submit">Assign furbaby to parent!</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    furbabies: state.furbabies,
    parents: state.parents
  }
}

// const mapDispatch = dispatch => {
//   return {
//     submit(info) {
//       const { kittenName: name, kittenBreed: breed } = info;
//       dispatch(createFurbabyThunk({name, breed}))
//     }
//   }
// }

const MatchContainer = connect(mapState, null)(Match);
export default MatchContainer;