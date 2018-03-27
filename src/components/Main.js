import React, { Component } from 'react';
import './Main.css';
import Input from './Input';

class Main extends Component {
  render() {
    return (
      <div className="Main">
        <header className="Main-header">
          <h1 className="Main-title">Welcome to For Animals Inc.</h1>
        </header>
        <div className="Main-intro">
          <Input />
        </div>
      </div>
    );
  }
}

export default Main;
