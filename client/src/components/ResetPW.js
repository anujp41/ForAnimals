import React, {Component} from 'react';
import {checkToken} from '../utils';
import './ResetPW.css';
import history from '../history';

class ResetPW extends Component {

  constructor() {
    super();
    this.renderPWForm = this.renderPWForm.bind(this);
    this.pwMismatch = this.pwMismatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.takeToPWReset = this.takeToPWReset.bind(this);
    this.state = {
      tokenExpired: 'loading',
      password: '',
      confirmPassword: '',
      showMismatch: null
    }
  }

  handleChange(event) {
    const {target: {name, value}} = event;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {password, confirmPassword} = this.state;
    if (password !== confirmPassword) {
      this.setState({showMismatch: true});
      setTimeout(() => this.setState({showMismatch: false}), 1250);
      return;
    }
  }

  pwMismatch() {
    const {showMismatch} = this.state;
    if (showMismatch) return <div className='pw-match'>Password Do Not Match!</div>
    else return null
  }

  renderPWForm() {
    const {password, confirmPassword} = this.state;
    return (
      <div className='login-container'>
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <div className='formfield'>
            <input required className='input' type='password' name='password' value={password} onChange={this.handleChange}/>
            <label id='no-transform' className='label-text'>Password:</label>
          </div>

          <div className='formfield'>
            <input required className='input' type='password' name='confirmPassword' value={confirmPassword} onChange={this.handleChange}/>
            <label id='no-transform' className='label-text'>Confirm Password:</label>
            {this.pwMismatch()}
          </div>

          <button className='button' type='submit'>Reset Password</button>
        </form>
      </div>
    )
  }

  componentWillMount() {
    const token = this.props.location.pathname.split('/').pop();
    checkToken({resetToken: token})
    .then(tokenExpired => {
      this.setState({tokenExpired})
    })
  }

  takeToPWReset() {
    history.push({
      pathname: '/',
      pwModal: true
    })
  }

  render() {
    const {tokenExpired} = this.state;
    if (tokenExpired === 'loading') {
      return <div className='loader'></div>
    } else if (tokenExpired === 'Not Found') {
      return <div className='token-expire'>Something went wrong. <b className='take-to-reset' onClick={this.takeToPWReset}>Click here</b> request another password reset email!</div>
    } else if (tokenExpired === true) {
      return this.renderPWForm();
    } else {
      return <div className='token-expire'>Your link has expired. <b className='take-to-reset' onClick={this.takeToPWReset}>Click here</b> request another password reset email!</div>
    }
  }
}

export default ResetPW;