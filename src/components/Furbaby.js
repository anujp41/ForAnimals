import React, { Component } from "react";
import { connect } from "react-redux";
import { createFurbabyThunk } from '../store';
import './Input.css';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import firebase from '../firebase';


class Furbaby extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      breed: '',
      photo: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // this.props.submit(this.state);
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const image = this.state.photo.preview;
    storageRef.put(image)
    .then(snapshot => console.log('i uploaded the photo ', snapshot))
    .catch(err => console.log('there was an error ', err))
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name] : value });
  }

  onChange(event) {
    console.log('uploaded files ', event.target.files)
  }

  onImageDrop(files) {
    console.log('uploaded ', files)
    const photo = files[0];
    this.setState({ photo })
    console.log( 'and photo is ', photo.name)

    const storage = firebase.storage();
    const storageRef = storage.ref('images');
    // const image = this.state.photo.preview;

    storageRef.put(photo)
    .then(snapshot => console.log('i uploaded the photo ', snapshot))
    .catch(err => console.log('there was an error ', err))
  }

  render() {
    const { name, breed } = this.state;
    return (
      <div className='container'>
        <form onSubmit={this.handleSubmit}>
        <h1>Details for kitten:</h1>
          <ul>
            <li>
              <label>Name:</label>
              <input type="text" name="name" value={name} onChange={this.handleChange}/>
            </li>
            <li>
              <label>Breed:</label>
              <input type="text" name="breed" value={breed} onChange={this.handleChange}/>
            </li>

            <li style={{textAlign: 'center'}}>
              <Dropzone
                multiple={false}
                accept="image/*" 
                onDrop={this.onImageDrop.bind(this)}>
                <p>Drop an image or click to select a file to upload.</p>
                <img src={this.state.photo && this.state.photo.preview}/>
              </Dropzone>
            </li>

            <input type='file' onChange={this.onChange} />

            <li>
              <input type="submit" value="submit" />
            </li>
          </ul>
        </form>
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