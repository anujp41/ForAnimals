import React, { Component } from "react";
import { connect } from "react-redux";
import './Match.css';
import { updateFosterThunk } from '../store';

class Match extends Component {

  constructor(props) {
    super(props);
    this.state = {
      furbaby: null,
      parent: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    const name = event.target.name;
    const value = parseInt(event.target.value, 10);
    this.setState({ [name] : value});
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.submit(this.state);
  }

  componentWillReceiveProps(props) {
    const furbaby = props.furbabies.length && props.furbabies[0].id;
    const parent = props.parents.length && props.parents[0].id;
    this.setState({furbaby, parent});
  }

  render() {
    const { furbabies, parents } = this.props;
    return (
      <div className="matchContainer">
        <select name="furbaby" onChange={this.handleChange}>
          {furbabies.length && furbabies.map(furbaby => <option key={furbaby.id} value={furbaby.id}>{furbaby.name}</option>)}
        </select>


        <select name="parent" onChange={this.handleChange}>
          {parents.length && parents.map(parent => <option key={parent.id} value={parent.id}>{parent.name}</option>)}
        </select>

        <button type="submit" value="submit" onClick={this.handleSubmit}>Assign furbaby to parent!</button>
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

const mapDispatch = dispatch => {
  return {
    submit(info) {
      console.log('dispatching')
      dispatch(updateFosterThunk(info))
    }
  }
}

const MatchContainer = connect(mapState, mapDispatch)(Match);
export default MatchContainer;