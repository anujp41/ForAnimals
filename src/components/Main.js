import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import { getFurbabiesThunk } from '../store';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

class Main extends Component {

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div className="Main">
        <header className="Main-header">
          <img alt='' className="Main-logo" src={logo}/>
          <h1 className="Main-title">Welcome to For Animals Inc Database</h1>
        </header>
        <div className="Main-intro">
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
      // .then(() => dispatch(getParentsThunk()));
    }
  }
}

const MainContainer = connect(null, mapDispatch)(Main);
export default MainContainer;