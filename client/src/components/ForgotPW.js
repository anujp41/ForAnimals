import React, {Component} from 'react';
import { connect } from 'react-redux';
import FlashMsg from './FlashMsg';
import { forgotPW } from '../store';
import './ForgotPW.css';

class ForgotPW extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: 'myemail@email.com'
    }
  }

  handleChange(event) {
    const {target: {name, value}} = event;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.forgotPW(this.state);
  }

  render() {
    const {email} = this.state;
    const {showModal} = this.props;
    return (
      <div className='backdrop'>
        <div className='container-modal pw-container'>
          <div className='pw-modal-cancel' onClick={()=>showModal(false)}>X</div>
          <div className='pw-bubble'>
            <h5>Enter your email and press send to get an email from Dtc. Kitty!</h5>
            <input type='text' name='email' placeholder='Your email....' value={email} onChange={this.handleChange}></input>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
          <img className='pw-cat' src={require('../assets/cat-pw.png')}/>
        </div>
        <FlashMsg/>
      </div>
    )
  }
}

const mapDispatch = { forgotPW };

export default connect(null, mapDispatch)(ForgotPW);