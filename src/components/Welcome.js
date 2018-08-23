import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFurbabiesThunk, getParentsThunk } from '../store';

class Welcome extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(action=null) {
    // this.props.getParentsThunk();
    // if (action==='furbabies') this.props.getFurbabiesThunk();
  }

  render() {
    return (
      <div style={divStyle}>
        {/* <Link to={'/input'}>
          <h1>Let's visit this site!</h1>
        </Link> */}

        <Link to={'/furbaby'} onClick={()=>this.handleClick()}>
          <h1>Add furbabies!</h1>
        </Link>

        {/* <Link to={'/parent'}>
          <h1>Add parents!</h1>
        </Link> */}

        <Link to={'/furbabies'} onClick={()=>this.handleClick('furbabies')}>
          <h1>Let's go see the furbabies!</h1>
        </Link>

        {/* <Link to={'/parents'}>
          <h1>Let's go see the parents!</h1>
        </Link> */}
      </div>
    );
  }
}

const mapDispatch = { getFurbabiesThunk, getParentsThunk };

export default connect(null, mapDispatch)(Welcome);

const divStyle = {
  fontFamily: 'Eczar, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}