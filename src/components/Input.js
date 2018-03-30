import React, { Component } from "react";
import './Input.css';
import Furbaby from './Furbaby';
import Parent from './Parent';
import Match from './Match';

class Input extends Component {
  render() {
    return (
      <div>
        <Furbaby />
        <Parent />
        <Match />
      </div>
    )
  }
}

export default Input; 