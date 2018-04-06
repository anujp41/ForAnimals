import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {

  render() {
    return (
      <div style={divStyle}>
        <Link to={'/input'}>
          <h1>Let's visit this site!</h1>
        </Link>

        <Link to={'/furbaby'}>
          <h1>Add furbabies!</h1>
        </Link>

        <Link to={'/parent'}>
          <h1>Add parents!</h1>
        </Link>

        <Link to={'/furbabies'}>
          <h1>Let's go see the furbabies!</h1>
        </Link>

        <Link to={'/parents'}>
          <h1>Let's go see the parents!</h1>
        </Link>
      </div>
    );
  }
}

export default Welcome;

const divStyle = {
  fontFamily: 'Eczar, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}