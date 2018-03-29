import React, { Component } from "react";
import { connect } from "react-redux";
import { createFurbabyThunk } from '../store';
import './Input.css';

class Furbaby extends Component {

  constructor() {
    super();
    this.state = {
      kittenName: '',
      kittenBreed: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.submit(this.state);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name] : value });
  }

  render() {
    const { kittenName, kittenBreed } = this.state;
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
        <h1>Details for kitten:</h1>
          <ul>
            <li>
              <label>Name:</label>
              <input type="text" name="kittenName" value={kittenName} onChange={this.handleChange}/>
            </li>
            <li>
              <label>Breed:</label>
              <input type="text" name="kittenBreed" value={kittenBreed} onChange={this.handleChange}/>
            </li>
            <li>
              <input type="submit" value="submit" />
            </li>
          </ul>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    furbabies: state.furbabies
  }
}

const mapDispatch = dispatch => {
  return {
    submit(info) {
      const { kittenName: name, kittenBreed: breed } = info;
      dispatch(createFurbabyThunk({name, breed}))
    }
  }
}

const FurbabyContainer = connect(mapState, mapDispatch)(Furbaby);
export default FurbabyContainer;