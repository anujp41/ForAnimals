import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import { getFurbabiesThunk, getParentsThunk } from '../store';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

class Main extends Component {

  componentDidMount() {
    this.props.getData();
  }

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

const mapDispatch = dispatch => {
  return {
    getData() {
      dispatch(getFurbabiesThunk())
      .then(() => dispatch(getParentsThunk()));
    }
  }
}

const MainContainer = connect(null, mapDispatch)(Main);
export default MainContainer;