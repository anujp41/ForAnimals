import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {

  render() {
    return (
      <div>
        <Link to={'/input'}>
          <h1>Let's visit this site!</h1>
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