import React, { Component } from "react";
import { connect } from "react-redux";
import { createFurbabyThunk, createParentThunk } from '../store';

class Input extends Component {

  constructor() {
    super();
    this.state = {
      kittenName: 'Remington',
      kittenBreed: 'Orange',
      parentName: 'Jean',
      parentAddress: 'Brooklyn, NY'
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
    const {kittenName, kittenBreed, parentName, parentAddress} = this.state
    return (
      <div>
        <div className='kittens'>
          <form onSubmit={this.handleSubmit}>
          <h1>Enter kittens:</h1>
            
            <label>
              Name:
            </label>
            <input type="text" name="kittenName" value={kittenName} onChange={this.handleChange}/>
            
            <label>
              Breed:
            </label>
            <input type="text" name="kittenBreed" value={kittenBreed} onChange={this.handleChange}/>
          </form>
        </div>

        <div className='parents'>
          <form onSubmit={this.handleSubmit}>
            <h1>Enter kittens:</h1>

            <label>
              Name:
              <input type="text" name="parentName" value={parentName} onChange={this.handleChange}/>
            </label>

            <label>
              Address:
              <input type="text" name="parentAddress" value={parentAddress} onChange={this.handleChange}/>
            </label>

            <input type="submit" value="Submit" />
          </form>
        </div>

      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    submit(info) {
      var { kittenName: name, kittenBreed: breed } = info;
      dispatch(createFurbabyThunk({name, breed}))
      // .then(() => {
      var { parentName: name, parentAddress: address } = info;
      dispatch(createParentThunk({name, address}));
      // })
    }
  }
}

const InputContainer = connect(null, mapDispatch)(Input);
export default InputContainer;