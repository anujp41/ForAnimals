import React, { Component } from "react";
import { connect } from "react-redux";
import { createFurbabyThunk } from '../store';
import './Input.css';
import Dropzone from 'react-dropzone';
import firebase from '../firebase';
import { Parent } from './index';
import $ from 'jquery';

class Furbaby extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      breed: '',
      photoUrl: '',
      photo: null,
      age: '',
      sex: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.saveToDB = this.saveToDB.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const storage = firebase.storage();
    const name = this.state.name.replace(/[\W]/g, '').toLowerCase();
    const storageRef = storage.ref(`furbabies/${name}`);
    const photo = this.state.photo;

    await storageRef.put(photo)
    .then(snapshot => this.setState({photoUrl: snapshot.downloadURL}))
    .then(() => this.saveToDB())
    .catch(err => console.log('there was an error ', err))
  }

  saveToDB() {
    const {name, breed, photoUrl} = this.state;
    this.props.submit({name, breed, photoUrl});
    this.setState({name: '', breed: '', photo: null, photoUrl: ''});
    alert('Furbaby saved to database!');
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name] : value });
  }

  onImageDrop(files) {
    const photo = files[0];
    this.setState({ photo });
  }

  componentDidMount() {
    $('.fostercheck').on('click',() => $('.parentForm').toggle(1000));
    $('textarea').on('keyup', () => {
      const num = $('.commentInput')[0].maxLength - $('textarea').val().length;
      const text = num + ' characters remaining!';
      // console.log('here ', num, $('.charactersLeft').html());
      // console.log('here ', $('.commentInput')[0].maxLength);
      // console.log('typed ', $('textarea').val(), $('textarea').val().length)
      $('.charactersLeft').text(text);
    });
  }

  render() {
    const { name, breed, age, sex } = this.state;
    return (
      <div className='container'>
        <form autoComplete="off" onSubmit={this.handleSubmit}>

          <div className="title">Enter details for our new furbaby:</div>

          <div className="general">

            <div className='formfield'>
              <input required type="text" name="name" value={name} onChange={this.handleChange}/>
              <div className="label-text">Name</div>
            </div>

            <div className='formfield'>
              <input required type="text" name="breed" value={breed} onChange={this.handleChange}/>
              <div className="label-text">Breed</div>
            </div>

            <div className='formfield'>
              <input required type="text" name="age" value={age} onChange={this.handleChange}/>
              <div className="label-text">Age</div>
            </div>

            <div className='formfield'>
              <input required type="text" name="sex" value={sex} onChange={this.handleChange}/>
              <div className="label-text">Sex</div>
            </div>

          </div>

          <div className='comment'>
              <textarea className='commentInput' maxLength='200' type="text" row='3' name="comments" onChange={this.handleChange}/>
              <div className="label-comment">Comments</div>
              <div className='charactersLeft'>200 characters remaining</div>
            </div>

          <div className="dropzone">
            <Dropzone
              multiple={false}
              accept="image/*"
              style={dropzoneStyle} 
              onDrop={this.onImageDrop.bind(this)}>
              <p>Click to select a picture.</p>
              <img alt="" src={this.state.photo && this.state.photo.preview}/>
            </Dropzone>
          </div>

          <div className='health'>
              <div className='healthTitle'>Health Info for furbaby</div>
              <div className='flexContainer'>

              <div className='flexItem'>
                <div className='flexQ'>Is the furbaby spayed?</div><br/>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"></div>
                </label>
              </div>

              <div className='flexItem'>
                <div className='flexQ'>FIV Positive?</div><br/>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"/>
                </label>
              </div>
              
            </div>
          </div>

          <div className='foster'>
            <div className='fosterdiv'>
              <div className='fosterQ'>Furbaby fostered?</div>
              <input className='fostercheck' type='checkbox' style={{margin: 0, width: '0px', height: '25px', paddingLeft: 0}}/>
            </div>
          </div>

          <div className='foster'>
            <div className='fosterdiv'>
              <div className='fosterQ'>Furbaby adopted?</div>
              <input className='fostercheck' type='checkbox' style={{margin: 0, width: '0px', height: '25px', paddingLeft: 0}}/>
            </div>
          </div>

          <button type="submit" value="submit">Submit</button>
            
        </form>

        <div hidden className='parentForm'>
          <Parent button='hidden'/>
        </div>

      </div>
    )
  }
}

const mapState = state => {
  return {
    furbabies: state.furbabies
  }
}

const mapDispatch = dispatch => {
  return {
    submit(info) {
      dispatch(createFurbabyThunk(info))
    }
  }
}

const FurbabyContainer = connect(mapState, mapDispatch)(Furbaby);
export default FurbabyContainer;

const dropzoneStyle = {
  display: 'flexbox',
  justifyContent: 'center',
  alignItems: 'center',
  height : '20%',
  border : 'none'
};