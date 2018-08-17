import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUserThunk } from '../store';
import './Main.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

class Main extends Component {

  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(event) {
    event.preventDefault();
    this.props.removeUserThunk();
  }

  render() {
    return (
      <div className="main">
        <header className="main-header">
          <img alt='' className="main-logo" src={logo}/>
          <h1 className="main-title">Welcome to For Animals Inc Database</h1>
        </header>
        <div className="main-intro">
        <button className='button' onClick={this.handleLogOut}>Log Out@</button>
        <Link to='/'>Go Home</Link>
        </div>
      </div>
    );
  }
}

const mapDispatch = {removeUserThunk};

export default connect(null, mapDispatch)(Main);