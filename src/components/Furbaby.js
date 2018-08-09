import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFurbabyThunk, createParentThunk } from '../store';
import './Input.css';
import Dropzone from 'react-dropzone';
import firebase from '../firebase';
import { ParentModal } from './index';
import uuidv1 from 'uuid/v1';
import FileDrop from 'react-file-drop';
const storage = firebase.storage();
const {currentStatusVals} = require('../assets');

class Furbaby extends Component {

  constructor() {
    super();
    this.state = {
      shelterName: '',
      ageYear: '',
      ageMonth: '',
      adoptedName: '',
      adoptionDate: '',
      birthDate: '',
      intakeDate: '',
      currentStatus: 'Choose from list:',
      size: '',
      coatColor: '',
      coatLength: '',
      breed: '',
      gender: '',
      altered: false,
      fivStatus: false,
      felvStatus: false,
      otherMedical: '',
      behavioralIssues: '',
      goodWithCats: 'Yes',
      goodWithDogs: 'Yes',
      goodWithChildren: 'Yes',
      specialNeeds: '',
      bio: '',
      addlComments: '',
      currentLocation: '',
      courtesyListing: false,
      courtesyListLoc: '',
      parent: null,
      youtubeVid: null,
      photo: null,
      photoUrl: '',
      microchipNum: '',
      otherFiles: [],
      otherFilesURL: [],
      showFiles: false,
      showModal: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.saveToDB = this.saveToDB.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setParent = this.setParent.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.saveToFirebase = this.saveToFirebase.bind(this);
    this.showFileList = this.showFileList.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState ({ [name] : value });
  };

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.currentStatus === 'Choose from list:') {
      alert(`Please select the current status of ${this.state.shelterName}!`);
      return;
    }
    const firebaseFolder = uuidv1();
    await this.handleDate(this.state.ageYear, this.state.ageMonth);
    const photoUrl = this.state.photo !== null ? await this.saveToFirebase(firebaseFolder, this.state.photo) : null;
    let promiseArr = [];
    let otherFilesURL = [];
    if (this.state.otherFiles.length) {
      promiseArr = this.state.otherFiles.map(async (file) => await this.saveToFirebase(firebaseFolder, file).then((value) => value));
      otherFilesURL = await Promise.all(promiseArr);
    }
    this.setState({photoUrl, otherFilesURL});
    this.saveToDB();
  }

  handleDate(ageYear, ageMonth) {
    const today = new Date();
    let [ year, month, date ]  = [ today.getFullYear(), today.getMonth()+1, today.getDate() ];
    year -= ageYear;
    month -= ageMonth;
    if (month <= 0) {
      year += Math.min(-1, Math.floor(month/12));
      month += 12;
    }
    const birthDate = year+'-'+month+'-'+date;
    this.setState({ birthDate });
  }

  saveToFirebase(folder, file) {
    return new Promise(resolve => {
      const name = file.name;
      const storageRef = storage.ref('furbabies').child(`${folder}/${name}`);
      storageRef.put(file)
      .then(result => {
        const { metadata } = result;
        return resolve({path: metadata.fullPath, downloadURL: result.downloadURL})})
    });
  }

  saveToDB() {
    const defaultState = {
      shelterName: '',
      ageYear: '',
      ageMonth: '',
      adoptedName: '',
      adoptionDate: '',
      birthDate: '',
      intakeDate: '',
      currentStatus: 'Choose from list:',
      size: '',
      coatColor: '',
      coatLength: '',
      breed: '',
      gender: '',
      altered: false,
      fivStatus: false,
      felvStatus: false,
      otherMedical: '',
      behavioralIssues: '',
      goodWithCats: 'Yes',
      goodWithDogs: 'Yes',
      goodWithChildren: 'Yes',
      specialNeeds: '',
      bio: '',
      addlComments: '',
      currentLocation: '',
      courtesyListing: false,
      courtesyListLoc: '',
      parent: null,
      youtubeVid: null,
      photo: null,
      photoUrl: '',
      microchipNum: '',
      otherFiles: [],
      otherFilesURL: [],
      showFiles: false,
      showModal: false
    };
    const { parent, ageYear, ageMonth, photo, otherFiles, showFiles, ...furbaby } = this.state;
    this.props.submit(parent, furbaby);
    this.setState({...defaultState});
    alert('Furbaby saved to database!');
  }

  onImageDrop(files) {
    const response = this.state.photo === null ? true : window.confirm('Do you want to replace the current photo?');
    if (response) {
      const photo = files[0];
      this.setState({ photo });
    }
  }

  handleDrop (inputFiles) {
    const otherFiles = [...this.state.otherFiles, ...inputFiles];
    this.setState({ otherFiles });
  }

  handleStatus(event) {
    const noModalStatus = ['Adoptable', 'Available as Barn Cat', 'Deceased', 'Returned to Colony'];
    const target = event.target;
    const currentStatus = target.value;
    this.setState ({ currentStatus });
    if (noModalStatus.indexOf(currentStatus) === -1 && this.state.parent === null) {
      this.setState({ showModal: true });
      return;
    }
    if (noModalStatus.indexOf(currentStatus) >= 0) {
      this.setState({ parent: null, adoptedName: '', adoptionDate: null, parentId: null });
      return;
    }
  }

  toggleModal(showModal, method=null) {
    this.setState({ showModal });
    if (method === 'cancelled') {
      this.setState({ currentStatus: 'Choose from list:'})
    }
  }

  setParent(parent, adoptedName, adoptionDate) {
    this.setState({ parent, adoptedName, adoptionDate });
  }

  showFileList() {
    const showFiles = this.state.showFiles;
    this.setState({ showFiles: !showFiles});
  }

  removeFile(event) {
    event.preventDefault();
    const targetFileName = event.target.name;
    let otherFiles = this.state.otherFiles;
    otherFiles = otherFiles.filter(file => file.name !== targetFileName);
    this.setState({otherFiles});
    if (otherFiles.length === 0) this.setState({ showFiles: false });
  }

  componentDidMount() {
    const intakeDate = new Date().toISOString().split('T')[0];
    this.setState({ intakeDate, today: intakeDate });
  }

  render() {
    const { 
      shelterName,
      ageYear,
      ageMonth, 
      intakeDate,
      size,
      coatColor,
      coatLength,
      breed,
      gender,
      altered,
      fivStatus,
      felvStatus,
      otherMedical,
      behavioralIssues,
      goodWithCats,
      goodWithDogs,
      goodWithChildren,
      specialNeeds,
      bio,
      addlComments,
      currentLocation,
      courtesyListing,
      courtesyListLoc,
      youtubeVid,
      microchipNum,
      otherFiles,
      currentStatus,
      today,
      parent } = this.state;
    const selectOption = ['Yes', 'No', 'Unsure'];
    const status = currentStatusVals;
    return (
      <div className='container'>

        <form autoComplete='off' onSubmit={this.handleSubmit}>

          <div className='title'>Enter details for our new furbaby:</div>,
          <div className='general'>

            <div className='formfield'>
              <input required className='input' type='text' name='shelterName' value={shelterName} onChange={this.handleChange}/>
              <label className='label-text'>Name</label>
            </div>

            <div className='formfield'>
              <div className='input ageEntry'>
                <input required type='number' min='0' max='20' className='years' name='ageYear' value={ageYear} onChange={this.handleChange}/>
                <span>Years</span>
                <input required type='number' min='0' max='12' className='months' name='ageMonth' value={ageMonth} onChange={this.handleChange}/>
                <span>Months</span>
              </div>
              <label className='label-text' type='age'>Age</label>
            </div>

            <div className='formfield'>
              <input required className='input' type='text' name='breed' value={breed} onChange={this.handleChange}/>
              <label className='label-text'>Breed</label>
            </div>

            <div className='formfield'>
              <label className='label-text'>Gender</label>
              <select required name='gender' className='genderEntry' value={gender} onChange={this.handleChange}>
                <option disabled value=''>Select:</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>

            <div className='formfield'>
              <input required className='input' type='text' name='size' value={size} onChange={this.handleChange}/>
              <label className='label-text'>Size</label>
            </div>

            <div className='formfield coatfield'>
              <div className='coat-left'>
                <input required className='input' type='text' name='coatColor' value={coatColor} onChange={this.handleChange}/>
                <label className='label-text'>Coat Color</label>
              </div>
              <div className='coat-right'>
                <input required className='input' type='text' name='coatLength' value={coatLength} onChange={this.handleChange}/>
                <label className='label-text'>Coat Length</label>
              </div>
            </div>

          </div>

          <div className='comment bio'>
            <textarea className='commentInput' maxLength='250' type='text' row='3' name='bio' value={bio} placeholder='History / Biography of Furbaby' onChange={this.handleChange}/>
            <div className='charactersLeft'>{250-bio.length} character(s) remaining</div>
          </div>


          <div className='general'>
            <div className='formfield date-input'>
              <div className='date-field'>Intake Date: </div>
              <input required className='arrived' type='date' name='intakeDate' value={intakeDate} max={today} onChange={this.handleChange}/>
            </div>

            <div className='formfield'>
              <input required className='input' type='text' name='currentLocation' value={currentLocation} maxLength='30' onChange={this.handleChange}/>
              <label className='label-text'>Current Location</label>
            </div>

          </div>

          <div className='comment'>
            <textarea className='commentInput' maxLength='200' type='text' row='3' name='addlComments' value={addlComments} placeholder='Additional comments on health/appearance etc.' onChange={this.handleChange}/>
            <div className='charactersLeft'>{200-addlComments.length} character(s) remaining</div>
          </div>

          <div className='health'>
            <div className='healthTitle'>Health Info for furbaby</div>

            <div className='healthContainer'>

              <div className='healthItem'>
                <div className='healthQ'>Good w/ cats?</div>
                <select className='health-dropdown' name='goodWithCats' value={goodWithCats} onChange={this.handleChange}>
                  {selectOption.map((item, idx) => <option key={idx}>{item}</option>)}
                </select>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Good w/ dogs?</div>
                <select className='health-dropdown' name='goodWithDogs' value={goodWithDogs} onChange={this.handleChange}>
                  {selectOption.map((item, idx) => <option key={idx}>{item}</option>)}
                </select>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Good w/ children?</div>
                <select className='health-dropdown' name='goodWithChildren' value={goodWithChildren} onChange={this.handleChange}>
                  {selectOption.map((item, idx) => <option key={idx}>{item}</option>)}
                </select>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Has FIV?</div><br/>
                <label className='switch'>
                  <input className='input' type='checkbox' checked={fivStatus} name='fivStatus' onChange={this.handleChange}/>
                  <div className='slider'></div>
                </label>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Has FeLV?</div><br/>
                <label className='switch'>
                  <input className='input' type='checkbox' checked={felvStatus} name='felvStatus' onChange={this.handleChange}/>
                  <div className='slider'/>
                </label>
              </div>

              <div className='healthItem'>
                <div className='healthQ'>Is Altered?</div><br/>
                <label className='switch'>
                  <input className='input' type='checkbox' checked={altered} name='altered' onChange={this.handleChange}/>
                  <div className='slider'/>
                </label>
              </div>
              
            </div>
          </div>

          <div className='general'>

            <div className='otherComment'>
              <textarea className='otherCommentInput' maxLength='75' type='text' row='3' name='behavioralIssues' value={behavioralIssues} placeholder='Behavioral Issues:' onChange={this.handleChange}/>
              <div className='charactersLeft'>{75-behavioralIssues.length} character(s) remaining</div>
            </div>

            <div className='otherComment'>
              <textarea className='otherCommentInput' maxLength='75' type='text' row='3' name='otherMedical' value={otherMedical} placeholder='Other Medical Issues:' onChange={this.handleChange}/>
              <div className='charactersLeft'>{75-otherMedical.length} character(s) remaining</div>
            </div>

            <div className='otherComment'>
              <textarea className='otherCommentInput' maxLength='75' type='text' row='3' name='specialNeeds' value={specialNeeds} placeholder='Special Needs, if any:' onChange={this.handleChange}/>
              <div className='charactersLeft'>{75-specialNeeds.length} character(s) remaining</div>
            </div>

            <div className='otherComment'>
              <div className='formfield'>
                <input className='input otherDetail' type='text' name='youtubeVid' value={youtubeVid || ''} onChange={this.handleChange}/>
                <label className='label-text otherDetail'>YouTube Link:</label>
              </div>
              <div className='formfield'>
                <input className='input otherDetail' type='text' name='microchipNum' value={microchipNum} onChange={this.handleChange}/>
                <label className='label-text otherDetail'>Microchip ID:</label>
              </div>
            </div>

            <div className='dropzone'>
              <Dropzone
                className='drop-zone'
                multiple={false}
                accept='image/*'
                onDrop={this.onImageDrop}>
                <p>Upload pictures</p>
                <p>(Limit One):</p>
                <img className='furbaby-photo' alt='' src={this.state.photo && this.state.photo.preview}/>
              </Dropzone>
            </div>

            <div className='dropzone'>
              <p>Upload Medical Forms</p>
              <p>(Drop files in the box):</p>
              <FileDrop onDrop={this.handleDrop}>
                {otherFiles.length> 0 && 
                  <div className='tooltip'>
                    <h6 className='tooltipLabel' onClick={this.showFileList} >{otherFiles.length} file(s) added!</h6>
                    <span className='tooltiptext'>Click to see list of files!</span>
                    {this.state.showFiles && 
                      <div className='fileListBox'>
                        <button className='cancelbtn' onClick={this.showFileList}>Close</button>
                        <ul className='fileList'>
                          {otherFiles.map((file, idx) => (
                            <li className='fileItem' key={idx}>
                              <div className='fileListItem'>{file.name}
                                <button className='btnRemoveFile' name={file.name} onClick={this.removeFile} >X</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>}
                  </div>}
              </FileDrop>
            </div>

          </div>

          <div className='courtesyList'>
            <div className='courtesyList-Bool'>
              <div className='healthQ'>Is this a courtesy listing?</div>
              <label className='switch'>
                <input className='input' type='checkbox' checked={courtesyListing} name='courtesyListing' onChange={this.handleChange}/>
                <div className='slider'/>
              </label>
            </div>
            {courtesyListing && 
              <div className='courtesyList-Q'>
                <div className='formfield'>
                  <input className='input otherDetail' type='text' name='courtesyListLoc' value={courtesyListLoc} onChange={this.handleChange}/>
                  <label className='label-text otherDetail'>Provide detail of the person or rescue for whom we are cross listing:</label>
                </div>
              </div>}
          </div>

          <div className='status'>
            <div><ins>Current Status of furbaby:</ins></div>
              <select required name='currentStatus' className='currentStatus' value={currentStatus} onChange={this.handleStatus}>
                {status.map((curr, idx) => <option disabled={curr==='Choose from list:'} key={idx}>{curr}</option>)}
              </select>              
          </div>

          {parent !== null &&
            <div className='chosen-parent'>
              <button className='update-parent' onClick={()=>this.setState({showModal: true})}>Update</button>
              <div><b><ins>Selected Parent:</ins></b></div>
              <div>{parent.name}</div>
              <div>{parent.street}, {parent.city}, {parent.state}, {parent.zip}</div>
            </div>
          }

          <button className='button' type='submit' value='submit'>Submit</button>
            
        </form>

        {this.state.showModal && <ParentModal furbaby={shelterName} show={this.state.showModal} toggleModal={this.toggleModal} setParent={this.setParent} adoptionDate={null}/>}
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    submit(parent, furbaby) {
      if (parent && parent.id.length === 0) {
        const {id, ...parentInfo} = parent;
        dispatch(createParentThunk(parentInfo))
        .then(parent => {
          furbaby.parentId = parent.parent.id;
          dispatch(createFurbabyThunk(furbaby));
        });
      } else if (parent && parent.id > 0) {
        furbaby.parentId = parent.id;
        dispatch(createFurbabyThunk(furbaby));
      } else {
        dispatch(createFurbabyThunk(furbaby));
      }
    }
  }
}

const FurbabyContainer = connect(null, mapDispatch)(Furbaby);
export default FurbabyContainer;