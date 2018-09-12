import React, {Component} from 'react';
import { connect } from 'react-redux';
import { checkResetLink } from '../store';
import {checkToken} from '../utils';
import './ResetPW.css';

class ResetPW extends Component {

  constructor() {
    super();
    this.state = {
      tokenExpired: null
    }
  }

  componentWillMount() {
    const token = this.props.location.pathname.split('/').pop();
    checkToken({resetToken: token})
    .then(tokenExpired => this.setState({tokenExpired}))
  }

  render() {
    const {tokenExpired} = this.state;
    if (tokenExpired === null) {
      return <div className='loader'></div>
    } else if (tokenExpired === true) {
      return <div>You can change you PW!</div>
    } else {
      return <div>Your link has expired. Please try again!</div>
    }
  }
}

const mapDispatch = ({checkResetLink});

export default connect(null, mapDispatch)(ResetPW);