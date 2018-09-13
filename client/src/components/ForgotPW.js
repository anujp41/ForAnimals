import React, {Component} from 'react';
import { connect } from 'react-redux';
import FlashMsg from './FlashMsg';
import Loader from './Loader';
import { forgotPW } from '../store';
import './ForgotPW.css';

class ForgotPW extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: 'satchlespaul@gmail.com',
      loader: false
    }
  }

  handleChange(event) {
    const {target: {name, value}} = event;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loader: true})
    this.props.forgotPW(this.state);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.loader && nextProps.flashMsg.length > 0) return {...prevState, loader: false}
    else return {...prevState};
  }

  render() {
    const {email, loader} = this.state;
    const {showModal} = this.props;
    // console.log('state is', this.state)
    return (
      <div className='backdrop'>
        <div className='container-modal pw-container'>
          <div className='pw-modal-cancel' onClick={()=>showModal(false)}>X</div>
          <div className='pw-bubble'>
            <h5>Enter your email and press send to get an email from Detective Kitty!</h5>
            <input type='text' name='email' placeholder='Your email....' value={email} onChange={this.handleChange}></input>
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
          <img className='pw-cat' src={require('../assets/cat-pw.png')}/>
        </div>
        <FlashMsg/>
        {loader && <Loader/>}
      </div>
    )
  }
}

const mapState = state => ({flashMsg: state.flashMsg})

const mapDispatch = { forgotPW };

export default connect(mapState, mapDispatch)(ForgotPW);