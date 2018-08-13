import React, { Component } from 'react';
import './Login.css';

class Login extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderLoginIn = this.renderLoginIn.bind(this);
    this.renderSignUp = this.renderSignUp.bind(this);
    this.state = {
      email: '',
      password: '',
      fullName: '',
      loginButton: true,
      signupButton: false
    }
  }

  handleChange(event) {
    const {target: {name, value}} = event;
    this.setState({ [name]: value });
  }

  handleLogin(event) {
    event.preventDefault();
    console.log('to log the user in!');
  }

  handleClick(event) {
    event.preventDefault();
    const {loginButton: prevLogIn, signupButton: prevSignUp} = this.state;
    console.log('prevSignUp ', prevSignUp)
    const name = event.target.name;
    if (name === 'login') {
      this.setState({ loginButton: true, signupButton: false })
      if (prevSignUp) {
        this.setState({ email: '', password: '', fullName: ''});
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
    const {email, password, fullName} = this.state;
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

        <div className='formfield'>
          <input required className='input' type='text' name='fullName' value={fullName} onChange={this.handleChange}/>
          <label className='label-text'>Full Name:</label>
        </div>

        <button className='button' type='submit'>Sign Up</button>
      </form>
    )
  }

  render() {
    const { loginButton, signupButton} = this.state;
    console.log(this.state)
    return (
      <div className='login-container'>
        <div className='log-sign'>
          <button type='button' name='login' className={this.state.loginButton ? 'login active' : 'login'} onClick={this.handleClick}>Login</button>
          <button type='button' name='signup' className={this.state.signupButton ? 'signup active' : 'signup'} onClick={this.handleClick}>Sign Up</button>
        </div>
        {loginButton && this.renderLoginIn()}
        {signupButton && this.renderSignUp()}
      </div>
    )
  }
}

export default Login;