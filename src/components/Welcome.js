import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFurbabiesThunk } from '../store';

class Welcome extends Component {

  render() {
    return (
      <div style={divStyle}>
        {/* <Link to={'/input'}>
          <h1>Let's visit this site!</h1>
        </Link> */}

        <Link to={'/furbaby'}>
          <h1>Add furbabies!</h1>
        </Link>

        {/* <Link to={'/parent'}>
          <h1>Add parents!</h1>
        </Link> */}

        <Link to={'/furbabies'} onClick={()=>this.props.getFurbabiesThunk()}>
          <h1>Let's go see the furbabies!</h1>
        </Link>

        {/* <Link to={'/parents'}>
          <h1>Let's go see the parents!</h1>
        </Link> */}
      </div>
    );
  }
}

const mapDispatch = { getFurbabiesThunk };

export default connect(null, mapDispatch)(Welcome);

const divStyle = {
  fontFamily: 'Eczar, sans-serif',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
}