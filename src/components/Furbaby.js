import React, { Component } from "react";
import { connect } from "react-redux";
import { createFurbabyThunk } from '../store';
import './Input.css';
import Dropzone from 'react-dropzone';
import firebase from '../firebase';

class Furbaby extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      breed: '',
      photoUrl: '',
      photo: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.saveToDB = this.saveToDB.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const storage = firebase.storage();
    const storageRef = storage.ref('images/kitten');
    const photo = this.state.photo;

    await storageRef.put(photo)
    .then(snapshot => this.setState({photoUrl: snapshot.downloadURL}))
    .then(() => this.saveToDB())
    .catch(err => console.log('there was an error ', err))
  }

  saveToDB() {
    const {name, breed, photoUrl} = this.state;
    this.props.submit({name, breed, photoUrl});
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

            <div>
              <Dropzone
                multiple={false}
                accept="image/*" 
                onDrop={this.onImageDrop.bind(this)}>
                <p>Drop an image or click to select a file to upload.</p>
                <img alt="" src={this.state.photo && this.state.photo.preview}/>
              </Dropzone>
            </div>

              <input type="submit" value="submit" />
            
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