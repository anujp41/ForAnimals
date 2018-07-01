import React, { Component } from 'react';
import './Main.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

class Main extends Component {

  render() {
    return (
      <div className="main">
        <header className="main-header">
          <img alt='' className="main-logo" src={logo}/>
          <h1 className="main-title">Welcome to For Animals Inc Database</h1>
        </header>
        <div className="main-intro">
        <Link to='/'>Go Home</Link>
        </div>
      </div>
    );
  }
}

export default Main;