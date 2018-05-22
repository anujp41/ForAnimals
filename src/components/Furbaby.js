import React, { Component } from "react";
import { connect } from "react-redux";
import { createFurbabyThunk, createParentThunk } from '../store';
import './Input.css';
import Dropzone from 'react-dropzone';
import firebase from '../firebase';
import { ParentModal } from './index';
import $ from 'jquery';
import uuidv1 from 'uuid/v1';

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
      gender: 'M',
      genderBoolean: false,
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
    this.setParentId = this.setParentId.bind(this);
    this.updateBirthDate = this.updateBirthDate.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const storage = firebase.storage();
    // const name = this.state.name.replace(/[\W]/g, '').toLowerCase();
    const name = uuidv1();
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
      gender: 'M',
      genderBoolean: false,
      comments: '',
      spayed: false,
      fivpositive: false,
      fostered: false,
      adopted: false,
      showModal: false,
      parent: null,
      arrived: new Date().toISOString().split('T')[0],
      parentId: null
    };
    const { parent, parentId } = this.state;
    let { name, breed, birthDate, gender, arrived, photoUrl, comments, spayed, fivpositive, fostered, adopted } = this.state;
    this.props.submit(parent, {name, breed, birthDate, gender, arrived, photoUrl, comments, spayed, fivpositive, fostered, adopted}, parentId);
    this.setState({...defaultState});
    alert('Furbaby saved to database!');
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    if (name === 'fostered' || name ===  'adopted') this.toggleModal(target.checked);
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (name === 'gender') {
      value = value ? 'F' : 'M';
      this.setState({
        [name] : value,
        genderBoolean: target.checked
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

  toggleModal(showModal) {
    this.setState({ showModal });
    if (showModal === false ) {
      this.setState({
        fostered: false,
        adopted: false
      })
    }
  }

  setParent(name, address) {
    this.setState({ parent: {name, address} });
  }

  setParentId(parentId) {
    this.setState({ parentId });
  }

  render() {
    const { name, breed, ageYear, ageMonth, genderBoolean, comments, spayed, fivpositive, fostered, adopted, arrived } = this.state;
    const today = new Date().toISOString().split('T')[0];
    const selectOption = ['Yes', 'No', 'Unsure'];
    return (
      <div className='container'>

        <form autoComplete="off" onSubmit={this.handleSubmit}>

          <div className="title">Enter details for our new furbaby:</div>

          <div className="general">

            <div className='formfield'>
              <input required className="input" type="text" name="name" value={name} onChange={this.handleChange}/>
              <label className="label-text">Name</label>
            </div>

            <div className='formfield'>
              <div className="input ageEntry">
                <input required type="number" min="0" max="20" className="years" name="ageYear" value={ageYear} onChange={this.handleChange}/>
                <span>Years</span>
                <input required type="number" min="0" max="12" className="months" name="ageMonth" value={ageMonth} onChange={this.handleChange}/>
                <span>Months</span>
              </div>
              <label className="label-text" type="age">Age</label>
            </div>

            <div className='formfield'>
              <input required className="input" type="text" name="breed" value={breed} onChange={this.handleChange}/>
              <label className="label-text">Breed</label>
            </div>


            <div className='formfield'>
              <label className="label-text" type="gender">Gender</label>
              <input readOnly className="input"/>
              <div className='genderEntry'>
                {/* <label className="switch"> */}
                  {/* <input className="input" type="checkbox" checked={genderBoolean} name='gender' onChange={this.handleChange}/> */}
                  {/* <div className="slider" type="gender"></div> */}
                {/* </label> */}
              </div>
            </div>

            <div className='formfield'>
              <input required className="input" type="text" name="name" value={name} onChange={this.handleChange}/>
              <label className="label-text">Size</label>
            </div>

            <div className='formfield coatfield'>
              <div className='coat-left'>
                <input required className="input" type="text" name="name" value={name} onChange={this.handleChange}/>
                <label className="label-text">Coat Size</label>
              </div>
              <div className='coat-right'>
                <input required className="input" type="text" name="name" value={name} onChange={this.handleChange}/>
                <label className="label-text">Coat Length</label>
              </div>
            </div>

          </div>

          <div className='comment bio'>
            <textarea className='commentInput' maxLength='250' type="text" row='3' name="bio" value={comments} placeholder='History/Biography of Furbaby' onChange={this.handleChange}/>
            <div className='charactersLeft'>250 character(s) remaining</div>
          </div>


          <div className="general">
            <div className='formfield date-input'>
              <div className='date-field'>Intake Date: </div>
              <input required className='arrived' type="date" name="arrived" value={arrived} max={today} onChange={this.handleChange}/>
              {/* <span className="isValid"></span> */}
            </div>

            <div className='formfield'>
              <input required className="input" type="text" name="name" value={name} maxLength="30" onChange={this.handleChange}/>
              <label className="label-text">Current Location</label>
            </div>

          </div>

          <div className='comment'>
            <textarea className='commentInput' maxLength='200' type="text" row='3' name="comments" value={comments} placeholder='Additional comments on health/appearance etc.' onChange={this.handleChange}/>
            <div className='charactersLeft'>200 character(s) remaining</div>
          </div>

          <div className='health'>
            <div className='healthTitle'>Health Info for furbaby</div>

            <div className='healthContainer'>

              <div className='healthItem'>
                <div className='healthQ'>Good w/ cats?</div>
                <select className='health-dropdown'>
                  {selectOption.map(item => <option value={item}>{item}</option>)}
                </select>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Good w/ dogs?</div>
                <select className='health-dropdown'>
                  {selectOption.map(item => <option value={item}>{item}</option>)}
                </select>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Good w/ children?</div>
                <select className='health-dropdown'>
                  {selectOption.map(item => <option className='behaviorQ' value={item}>{item}</option>)}
                </select>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Has FIV?</div><br/>
                <label className="switch">
                  <input className="input" type="checkbox" checked={fivpositive} name='fivpositive' onChange={this.handleChange}/>
                  <div className="slider"></div>
                </label>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Has FeLV?</div><br/>
                <label className="switch">
                  <input className="input" type="checkbox" checked={fivpositive} name='fivpositive' onChange={this.handleChange}/>
                  <div className="slider"/>
                </label>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Is Altered?</div><br/>
                <label className="switch">
                  <input className="input" type="checkbox" checked={fivpositive} name='fivpositive' onChange={this.handleChange}/>
                  <div className="slider"/>
                </label>
              </div>
              
            </div>
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

        <ParentModal furbaby={name} show={this.state.showModal} toggleModal={this.toggleModal} setParent={this.setParent} setParentId={this.setParentId}/>
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