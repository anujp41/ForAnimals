import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUserThunk, retrieveLoggedInUser } from '../store';
import { Link } from 'react-router-dom';
import './Main.css';
import logo from '../assets/logo.png';
import history from '../history';
import { setUser } from '../store';
import { checkUser } from '../utils';

class Main extends Component {

  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogOut(event) {
    event.preventDefault();
    this.props.removeUserThunk();
  }

  componentDidMount() {
    this.props.retrieveLoggedInUser();
    const currUser = JSON.parse(localStorage.getItem('current-user')); //converts string from local storage into object
    if (currUser !== null && !this.props.user.hasOwnProperty('id')) { //if local storage has user, then current user is set to 
      this.props.setUser(currUser);
      history.push('/welcome');
      return;
    }
    if (currUser === null) history.push('/');
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
        {user.hasOwnProperty('id') ? <Link to='/welcome'>Go Home</Link> : null}
        </div>
      </div>
    );
  }
}

const mapState = state => ({user: state.user})

const mapDispatch = { removeUserThunk, retrieveLoggedInUser, setUser };

export default connect(mapState, mapDispatch)(Main);