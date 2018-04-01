import React, { Component } from "react";
import './Input.css';
import { Furbaby, Parent, Match} from './index';

class Input extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Furbaby />
        <Parent />
        <Match />
      </div>
    )
  }
}

export default Input; 