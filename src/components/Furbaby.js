import React, { Component } from "react";
import { connect } from "react-redux";
import { createFurbabyThunk, createParentThunk } from '../store';
import './Input.css';
import Dropzone from 'react-dropzone';
import firebase from '../firebase';
import { ParentModal } from './index';
import $ from 'jquery';

class Furbaby extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      breed: '',
      photoUrl: '',
      photo: null,
      ageYear: 0,
      ageMonth: 0,
      birthDate: new Date().getTime(),
      sex: 'M',
      sexBoolean: false,
      comments: '',
      spayed: false,
      fivpositive: false,
      fostered: false,
      adopted: false,
      showModal: false,
      parent: null,
      arrived: new Date().toISOString().split('T')[0],
      parentId: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.saveToDB = this.saveToDB.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setParent = this.setParent.bind(this);
    this.updateBirthDate = this.updateBirthDate.bind(this);
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

  async saveToDB() {
    const defaultState = {
      name: '',
      breed: '',
      photoUrl: '',
      photo: null,
      ageYear: 0,
      ageMonth: 0,
      birthDate: new Date().getTime(),
      sex: 'M',
      sexBoolean: false,
      comments: '',
      spayed: false,
      fivpositive: false,
      fostered: false,
      adopted: false,
      showModal: false,
      parent: null,
      arrived: new Date().toISOString().split('T')[0]
    };
    const { parent, parentId } = this.state;
    let { name, breed, birthDate, sex, arrived, photoUrl, comments, spayed, fivpositive, fostered, adopted } = this.state;
    this.props.submit(parent, {name, breed, birthDate, sex, arrived, photoUrl, comments, spayed, fivpositive, fostered, adopted}, parentId);
    this.setState({...defaultState});
    alert('Furbaby saved to database!');
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === 'fostered' || name ===  'adopted') this.toggleModal();
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (name === 'sex') {
      value = value ? 'F' : 'M';
      this.setState({
        [name] : value,
        sexBoolean: target.checked
      })
    } else {
      this.setState({ [name] : value });
    }
    if (name === 'ageYear' || name === 'ageMonth') this.updateBirthDate(name, value);
  }

  updateBirthDate(name, value) {
    const ageYear = name === 'ageYear' ? +value : +this.state.ageYear;
    const ageMonth = name === 'ageMonth' ? +value : +this.state.ageMonth;
    
    const currDate = new Date().getTime();

    const yearMS = 3.154e+10;
    const monthMS = 2.628e+9;

    const yearInMS = ageYear * yearMS;
    const monthInMS = ageMonth * monthMS;

    const totalAge = yearInMS + monthInMS;
    const birthDate = currDate - totalAge;
    
    this.setState( { birthDate })
  }

  onImageDrop(files) {
    const photo = files[0];
    this.setState({ photo });
  }

  componentDidMount() {
    $('textarea').on('keyup', () => {
      const num = $('.commentInput')[0].maxLength - $('textarea').val().length;
      const text = num + ' character(s) remaining!';
      $('.charactersLeft').text(text);
    });
  }

  toggleModal() {
    const showModal = !this.state.showModal;
    this.setState({ showModal });
  }

  setParent(parent) {
    const parentId = parent.id;
    this.setState({ parentId });
  }

  render() {
    const { name, breed, ageYear, ageMonth, sexBoolean, comments, spayed, fivpositive, fostered, adopted, arrived } = this.state;
    const today = new Date().toISOString().split('T')[0];
    return (
      <div className='container'>

        <form autoComplete="off" onSubmit={this.handleSubmit}>

          <div className="title">Enter details for our new furbaby:</div>

          <div className="general">

            <div className='formfield'>
              <input required className="input" type="text" name="name" value={name} onChange={this.handleChange}/>
              <div className="label-text">Name</div>
            </div>

            <div className='formfield'>
              <input required className="input" type="text" name="breed" value={breed} onChange={this.handleChange}/>
              <div className="label-text">Breed</div>
            </div>

            <div className='formfield'>
              <input readOnly className="input" name="age"/>
              <div className="label-text" type="age">Age</div>
              <div className='ageEntry'>
                <input required type="number" min="0" max="20" className="years" name="ageYear" value={ageYear} onChange={this.handleChange}/>
                <span>Years</span>
                <input required type="number" min="0" max="12" className="months" name="ageMonth" value={ageMonth} onChange={this.handleChange}/>
                <span>Months</span>
              </div>
            </div>

            <div className='formfield'>
              <input readOnly className="input"/>
              <div className="label-text" type="sex">Sex</div>
              <div className='sexEntry'>
                <label className="switch">
                  <input className="input" type="checkbox" checked={sexBoolean} name='sex' onChange={this.handleChange}/>
                  <div className="slider" type="sex"></div>
                </label>
              </div>
            </div>

          </div>

          <div className='formfield date-input'>
            <div className='date-field'>Date brought to shelter!</div>
            <input required className="input arrived" type="date" name="arrived" value={arrived} max={today} onChange={this.handleChange}/>
            <span className="isValid"></span>
          </div>

          <div className='comment'>
              <textarea className='commentInput' maxLength='200' type="text" row='3' name="comments" value={comments} placeholder='Additional comments on health/appearance etc.' onChange={this.handleChange}/>
              <div className='charactersLeft'>200 character(s) remaining</div>
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
                  <input className="input" type="checkbox" checked={spayed} name='spayed' onChange={this.handleChange}/>
                  <div className="slider"></div>
                </label>
              </div>

              <div className='flexItem'>
                <div className='flexQ'>FIV Positive?</div><br/>
                <label className="switch">
                  <input className="input" type="checkbox" checked={fivpositive} name='fivpositive' onChange={this.handleChange}/>
                  <div className="slider"/>
                </label>
              </div>
              
            </div>
          </div>

          <div className='foster'>
            <div className='fosterdiv'>
              <div className='fosterQ'>Furbaby fostered?</div>
              <input className='input fostercheck' type='checkbox' name='fostered' checked={fostered} onChange={this.handleChange}/>
            </div>
          </div>

          <div className='adopt'>
            <div className='adoptdiv'>
              <div className='adoptQ'>Furbaby adopted?</div>
              <input className='input adoptcheck' type='checkbox' name='adopted' checked={adopted} onChange={this.handleChange}/>
            </div>
          </div>

          <button className='button' type="submit" value="submit">Submit</button>
            
        </form>

        <ParentModal furbaby={name} show={this.state.showModal} toggleModal={this.toggleModal} setParent={this.setParent}/>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    submit(parent, furbaby, parentId) {
      if (parent) {
        dispatch(createParentThunk(parent))
        .then(parent => {
          furbaby.parentId = parent.parent.id;
          dispatch(createFurbabyThunk(furbaby));
        });
      } else if (parentId) {
        furbaby.parentId = parentId;
        dispatch(createFurbabyThunk(furbaby));
      } else {
        dispatch(createFurbabyThunk(furbaby));
      }
    }
  }
}

const FurbabyContainer = connect(null, mapDispatch)(Furbaby);
export default FurbabyContainer;

const dropzoneStyle = {
  display: 'flexbox',
  justifyContent: 'center',
  alignItems: 'center',
  height : '20%',
  border : 'none'
};