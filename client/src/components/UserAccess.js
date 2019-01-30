import React, { Component } from 'react';
import './ResetPW.css';
import { provideAccess } from '../utils';
import Loader from './Loader';

class UserAccess extends Component {

  constructor() {
    super();
    this.state = {
      response: null
    }
  }
  componentWillMount() {
    provideAccess(this.props.location.pathname, this.props.location.search)
    .then(result => this.setState({response: result.data}))
  }

  render() {
    const {response} = this.state;
    if (!response) {
      return <Loader/>
    } else {
      return <div className='token-expire'>{response}</div>
    }
  }
}

export default UserAccess;