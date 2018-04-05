import React, { Component } from "react";
import { connect } from "react-redux";
import { createParentThunk } from '../store';
import './Input.css';

class Parent extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      address: ''
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
    const { name, address } = this.state;
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
        <h1>Details for parents:</h1>
          <ul>
            <li>
              <label>Name:</label>
              <input required type="text" name="name" value={name} onChange={this.handleChange}/>
            </li>
            <li>
              <label>Address:</label>
              <input required type="text" name="address" value={address} onChange={this.handleChange}/>
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
    parents: state.parents
  }
}

const mapDispatch = dispatch => {
  return {
    submit(info) {
      dispatch(createParentThunk(info));
    }
  }
}

const ParentContainer = connect(mapState, mapDispatch)(Parent);
export default ParentContainer;