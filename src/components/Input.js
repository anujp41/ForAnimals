import React, { Component } from "react";
import axios from 'axios';

class Input extends Component {

  constructor() {
    super();
    this.state = {
      kittenName: '',
      kittenBreed: '',
      parentName: '',
      parentAddress: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { parentName, parentAddress } = this.state;
    axios.post('http://localhost:8080/api/parents', {parentName, parentAddress});
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name] : value });
  }

  render() {
    return (
      <div>
        <div className='kittens'>
          <form onSubmit={this.handleSubmit}>
          <h1>Enter kittens:</h1>
            
            <label>
              Name:
            </label>
            <input type="text" name="kittenName" onChange={this.handleChange}/>
            
            <label>
              Breed:
            </label>
            <input type="text" name="kittenBreed" onChange={this.handleChange}/>
          </form>
        </div>

        <div className='parents'>
          <form onSubmit={this.handleSubmit}>
            <h1>Enter kittens:</h1>

            <label>
              Name:
              <input type="text" name="parentName" onChange={this.handleChange}/>
            </label>

            <label>
              Address:
              <input type="text" name="parentAddress" onChange={this.handleChange}/>
            </label>

            <input type="submit" value="Submit" />
          </form>
        </div>

      </div>
    )
  }
}

export default Input;