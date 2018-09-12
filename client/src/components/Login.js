import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashMsg from './FlashMsg';
import { signUpAndWelcome, logInAndWelcome } from '../store';
import './Login.css';
import ForgotPW from './ForgotPW';

class Login extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderLoginIn = this.renderLoginIn.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
    this.renderGoogle = this.renderGoogle.bind(this);
    this.showModal = this.showModal.bind(this);
    this.state = {
      email: 'myemail@email.com',
      password: 'a',
      firstName: '',
      lastName: '',
      loginButton: true,
      signupButton: false,
      pwModal: false
    }
  }

  showModal(show) {
    this.setState({pwModal: show})
  }

  handleChange(event) {
    const {target: {name, value}} = event;
    this.setState({ [name]: value });
  }

  handleLogin(event) {
    event.preventDefault();
    const {email, password } = this.state;
    this.props.logInAndWelcome({ email, password });
  }

  handleSignUp(event) {
    event.preventDefault();
    const {email, password, firstName, lastName} = this.state;
    this.props.signUpAndWelcome({ email, password, firstName, lastName });
  }

  handleClick(event) {
    event.preventDefault();
    const {loginButton: prevLogIn, signupButton: prevSignUp} = this.state;
    const name = event.target.name;
    if (name === 'login') {
      this.setState({ loginButton: true, signupButton: false })
      if (prevSignUp) {
        this.setState({ email: '', password: '', firstName: '', lastName: ''});
      }
    } else if (name === 'signup') {
      this.setState({ loginButton: false, signupButton: true });
      if (prevLogIn) {
        this.setState({ email: '', password: ''});
      }
    }
  }

  renderLoginIn() {
    const {email, password} = this.state;
    return (
      <form onSubmit={this.handleLogin}>
        <div className='formfield'>
          <input required className='input' type='email' name='email' value={email} onChange={this.handleChange}/>
          <label className='label-text'>Email:</label>
        </div>

        <div className='formfield'>
          <input required className='input' type='password' name='password' value={password} onChange={this.handleChange}/>
          <label className='label-text'>Password:</label>
        </div>

        <button className='button' type='submit'>Log In</button>
      </form>
    )
  }

  renderSignUp() {
    const {email, password, firstName, lastName} = this.state;
    return (
      <form onSubmit={this.handleSignUp} autoComplete='off'>
        <div className='formfield'>
          <input required className='input' type='email' name='email' value={email} onChange={this.handleChange}/>
          <label className='label-text'>Email:</label>
        </div>

        <div className='formfield'>
          <input required className='input' type='password' name='password' value={password} onChange={this.handleChange}/>
          <label className='label-text'>Password:</label>
        </div>

        <div className='formfield'>
          <input required className='input' type='text' name='firstName' value={firstName} onChange={this.handleChange}/>
          <label className='label-text'>First Name:</label>
        </div>

        <div className='formfield'>
          <input required className='input' type='text' name='lastName' value={lastName} onChange={this.handleChange}/>
          <label className='label-text'>Last Name:</label>
        </div>

        <button className='button' type='submit'>Sign Up</button>
      </form>
    )
  }

  renderGoogle() {
    const {loginButton} = this.state;
    const method = loginButton ? 'Login' : 'Sign-Up';
    return (
      <a className='google' self='_self' href={`${process.env.REACT_APP_PROCESS_URL}api/google`}>
        <img className='google-logo' src={require('../assets/google-logo.png')}/>
        <span className='google-text'>{method} with google!</span>
      </a>
    )
  }

  render() {
    const { loginButton, signupButton, pwModal} = this.state;
    return (
      <div>
        <div className='login-container'>
          <div className='log-sign'>
            <button type='button' name='login' className={this.state.loginButton ? 'login active' : 'login'} onClick={this.handleClick}>Login</button>
            <button type='button' name='signup' className={this.state.signupButton ? 'signup active' : 'signup'} onClick={this.handleClick}>Sign Up</button>
          </div>
          {loginButton && this.renderLoginIn()}
          {signupButton && this.renderSignUp()}
        </div>
        <h5 className='pw-forget' onClick={()=>this.showModal(true)}>Forgot Password</h5>
        {this.renderGoogle()}
        {!pwModal && <FlashMsg/>}
        {pwModal && <ForgotPW showModal={this.showModal}/>}
      </div>
    )
  }
}

const mapDispatch = { signUpAndWelcome, logInAndWelcome };

export default connect(null, mapDispatch)(Login);