import React, { Component } from "react";
import { connect } from "react-redux";
import './FurbabiesList.css';
import $ from 'jquery';

class FurbabiesList extends Component {

  componentDidMount() {
    $('.furbabyCard').hover(function(event) {
      console.log('here ', $(event.currentTarget).find('.furbabyNotes'));
      $(event.currentTarget).find('.furbabyNotes').toggle();
    });
  }

  render() {
    const { furbabies } = this.props;
    return (
      <div className='mainContainer'>
      {furbabies.map(furbaby => (
        <div key={furbaby.id} className='furbabyCard'>
          <div className='wrapper'>
            <img alt="" src={furbaby.photoUrl} />
            <div className='furbaby'>
              <div className='furbabyDetails'>
                <div className='furbabyName'><b>Name: </b>{furbaby.name}</div>
                <div className='furbabyBreed'><b>Breed: </b>{furbaby.breed}</div>
                <div hidden className='furbabyNotes'><b>Notes: </b>Cat is super healthy!</div>
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