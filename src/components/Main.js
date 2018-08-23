import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUserThunk } from '../store';
import './Main.css';
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
    const {user} = this.props;
    return (
      <div className="main">
        <header className="main-header">
          <img alt='' className="main-logo" src={logo}/>
          <h1 className="main-title">Welcome to For Animals Inc Database</h1>
        </header>
        <div className="main-intro">
        {user.hasOwnProperty('id') ? <button className='logout-btn' onClick={this.handleLogOut}>Log Out</button> : null}
        
        </div>
      </div>
    );
  }
}

const mapState = state => ({user: state.user})

const mapDispatch = {removeUserThunk};

export default connect(mapState, mapDispatch)(Main);