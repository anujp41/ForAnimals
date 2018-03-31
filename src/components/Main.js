import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Main.css';
import Input from './Input';
import { getFurbabiesThunk, getParentsThunk } from '../store';

class Main extends Component {

  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div className="Main">
        <header className="Main-header">
          <h1 className="Main-title">Welcome to For Animals Inc.</h1>
        </header>
        <div className="Main-intro">
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