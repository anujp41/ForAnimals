import React from 'react';
import './ForgotPW.css';

const ForgotPW = () => {
  return (
    <div className='pw-container'>
      <div className='pw-bubble'>
        <text>Dtc. Kitty thinks you have forgotten your password. If you would like, you can click here to reset!</text>
      </div>
      <img className='pw-cat' src={require('../assets/cat-pw.png')}/>
    </div>
  )
}

export default ForgotPW;