import React, {Component} from 'react';

class ResetPW extends Component {

  componentWillMount() {
    const token = window.location.pathname.split('/').pop();
    console.log(token)
  }

  render() {
    return (
      <div>Here you can reset your PW!</div>
    )
  }
}

export default ResetPW;