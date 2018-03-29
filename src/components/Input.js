import React, { Component } from "react";
import './Input.css';
import Furbaby from './Furbaby';
import Parent from './Parent';

class Input extends Component {
  render() {
    return (
      <div>
        <Furbaby />
        <Parent />
      </div>
    )
  }
}

export default Input; 