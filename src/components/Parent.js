import React, { Component } from "react";
import { connect } from "react-redux";
import { createParentThunk } from '../store';
import './Input.css';
import Dropzone from 'react-dropzone';
import firebase from '../firebase';

class Parent extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      address: '',
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
    const name = this.state.name.replace(/[\W]/g, '').toLowerCase();
    const storageRef = storage.ref(`parents/${name}`);
    const photo = this.state.photo;

    await storageRef.put(photo)
    .then(snapshot => this.setState({photoUrl: snapshot.downloadURL}))
    .then(() => this.saveToDB())
    .catch(err => console.log('there was an error ', err))
  }

  saveToDB() {
    const {name, address, photoUrl} = this.state;
    this.props.submit({name, address, photoUrl});
    this.setState({name: '', address: '', photo: null, photoUrl: ''});
    alert('Parent saved to database!');
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
    const { name, address } = this.state;
    return (
      <div className='container'>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="title">Enter details for our new fosters:</div>

          <input required type="text" name="name" value={name} onChange={this.handleChange}/>
          <div className="label-text">Name</div>

          <input required type="text" name="address" value={address} onChange={this.handleChange}/>
          <div className="label-text">Address</div>

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

          <button type="submit" value="submit">Submit</button>
            
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    parents: state.parents
  }
}

const mapDispatch = dispatch => {
  return {
    submit(info) {
      dispatch(createParentThunk(info));
    }
  }
}

const ParentContainer = connect(mapState, mapDispatch)(Parent);
export default ParentContainer;

const dropzoneStyle = {
  display: 'flexbox',
  justifyContent: 'center',
  alignItems: 'center',
  height : '20%',
  border : 'none'
};