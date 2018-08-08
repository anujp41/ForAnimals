import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import FileDrop from 'react-file-drop';
import './FurbabyDetailModal.css';
import { deleteFurbabyThunk, clearCurrFurbaby, updateFurbabyThunk, createParentThunk} from '../store';
import { ParentModal } from './index';
import firebase from '../firebase';
import { currentStatusVals } from '../assets';

// reference firebase storage
const storage = firebase.storage();
const database = firebase.database();

class FurbabyDetailModal extends Component {

  constructor(props) {
    super(props);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.showFileList = this.showFileList.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateDB = this.updateDB.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.setParent = this.setParent.bind(this);
    this.saveToFirebase = this.saveToFirebase.bind(this);
    this.archiveToFB = this.archiveToFB.bind(this);
    this.state = {
      shelterName: '',
      ageYear: '',
      ageMonth: '',
      adoptedName: '',
      adoptionDate: null,
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
      showModal: false,
      photoUpdated: false,
      filesUpdated: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {intakeDate, ...furbabyDetail} = nextProps.furbabyDetail;
    intakeDate = intakeDate && intakeDate.slice(0, intakeDate.indexOf('T'));
    const {diffYear: ageYear, diffMonth: ageMonth} = nextProps.getAge(nextProps.furbabyDetail.birthDate, 'detailModal');
    return {
      ...furbabyDetail,
      intakeDate,
      ageYear,
      ageMonth
    }
  }

  async handleUpdate(event) {
    event.preventDefault();
    const {photo, photoUpdated, photoUrl, filesUpdated, otherFiles, otherFilesURL} = this.state;
    const {path} = photoUrl;
    const folder = path.slice(path.indexOf('/'), path.lastIndexOf('/'));
    if (photoUpdated) {
      const updatePhotoUrl = await this.saveToFirebase(folder, photo);
      this.setState({ photoUrl: updatePhotoUrl, photoUpdated: false });
    }
    if (filesUpdated) {
      const promiseUrl = otherFiles.map(async (file) => await this.saveToFirebase(folder, file));//.then((value) => value));
      const fileURL = await Promise.all(promiseUrl);
      const updatedFiles = otherFilesURL.concat(fileURL);
      this.setState({ otherFilesURL: updatedFiles})//, otherFiles: [], filesUpdated: false});
    }
    if (photoUpdated || filesUpdated) {
      this.archiveToFB();
      this.updateDB();
    }
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

  archiveToFB() {
    console.log('now archiving')
    const {furbabyDetail} = this.props;
    const name = furbabyDetail.adoptedName || furbabyDetail.shelterName;
    const today = new Date();
    const [year, month, date, hour, min, sec] = [today.getFullYear(), today.getMonth()+1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds()];
    database.ref(`/${month}-${date}-${year}/${name}/${hour}h:${min}m:${sec}s`).set(furbabyDetail);
  }

  updateDB() {
    const { parent, ageYear, ageMonth, photo, otherFiles, showFiles, ...furbaby } = this.state;
    this.props.updateFurbaby(parent, furbaby, this.props.stateIdx);
    alert('Furbaby information updated!');
    this.props.clearCurr();
    this.props.closeModal();
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState ({ [name] : value });
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

  handleDelete(idx, arrIndex) {
    this.props.deleteFurbaby(idx, arrIndex);
    this.props.clearCurr();
    this.props.closeModal();
  }

  toggleModal(showModal) {
    this.setState({ showModal });
  }

  setParent(parent, adoptedName, adoptionDate) {
    this.setState({ parent, adoptedName, adoptionDate });
  }

  onImageDrop(file) {
    const response = window.confirm('Do you want to replace the current photo?'); //checks if user wants to update photo
    if (response) {
      const photo = file[0];
      this.setState({ photo, photoUpdated: true });
    }
  }

  handleDrop(inputFiles) {
    const otherFiles = [...this.state.otherFiles, ...inputFiles];
    this.setState({ otherFiles, filesUpdated: true });
  }

  showFileList() {
    const showFiles = this.state.showFiles;
    this.setState({ showFiles: !showFiles});
  }

  removeFile(event) {
    event.preventDefault();
    let targetFileName = event.target.name;
    let otherFiles = this.state.otherFiles;
    let otherFilesURL = this.state.otherFilesURL;
    /*  targetFileName is index if removed file is already onfirebase
        targetFileName is string if removed file is a file added by user
    */
    if (isNaN(+targetFileName)) { // true is targetFileName is string
      otherFiles = otherFiles.filter(file => file.name !== targetFileName);
      this.setState({otherFiles});
    } else { //else block entered if removed file is aleady on firebase
      otherFilesURL.splice(+targetFileName, 1);
      this.setState ({ otherFilesURL });
    }
    if ((otherFiles.length + otherFilesURL.length) === 0) this.setState({ showFiles: false });
    this.setState({ filesUpdated: true });
  }

  componentWillUnmount() {
    this.setState({
      shelterName: '',
      ageYear: '',
      ageMonth: '',
      adoptedName: '',
      adoptionDate: null,
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
      showModal: false,
      photoUpdated: false,
      filesUpdated: false
    })
  }

  render() {
    const {
      id, 
      shelterName,
      adoptedName,
      adoptionDate,
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
      parent } = this.state;
    const today = new Date().toISOString().split('T')[0];
    const selectOption = ['Yes', 'No', 'Unsure'];
    const status = currentStatusVals;
    if (this.props.showDetail) {
      return (
        <div className='backdrop-detail'>
          <button className='cancelbtn' onClick={this.props.closeModal}>
            Cancel
          </button>
          <div className='detail-container'>
            <form autoComplete='off' onSubmit={this.handleUpdate}>
  
            <div className='title-detail'>See details for {adoptedName || shelterName}</div>
            <div className='sub-title-detail'>View or edit any info for furbaby</div>
  
            <div className='general'>
  
              <div className='formfield'>
                <input required className='input' type='text' name='shelterName' value={adoptedName || shelterName} onChange={this.handleChange}/>
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
                  <img className='furbaby-photo' alt='' src={(this.state.photo && this.state.photo.preview) || this.state.photoUrl.downloadURL}/>
                </Dropzone>
              </div>
  
              <div className='dropzone'>
                <p>Upload Medical Forms</p>
                <p>(Drop files in the box):</p>
                <FileDrop onDrop={this.handleDrop}>
                  {(otherFiles.length> 0 || this.state.otherFilesURL.length) && 
                    <div className='tooltip'>
                      <h6 className='tooltipLabel' onClick={this.showFileList} >{(otherFiles.length || this.state.otherFilesURL.length) && otherFiles.length+this.state.otherFilesURL.length} file(s) added!</h6>
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
                            {this.state.otherFilesURL.map((file, idx) => (
                              <li className='fileItem' key={idx}>
                                <div className='fileListItem'>{file.path.slice(file.path.lastIndexOf('/')+1)}
                                  <button className='btnRemoveFile' name={idx} onClick={event=>this.removeFile(event)} >X</button>
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
                <button className='update-parent' type='button' onClick={()=>this.toggleModal(true)}>Update</button>
                <div><b><ins>Selected Parent:</ins></b></div>
                <div>{parent.name}</div>
                <div>{parent.street}, {parent.city}, {parent.state}, {parent.zip}</div>
              </div>
            }
  
              <button className='button button-update' type='submit' value='submit'>Update</button>
            </form>
            <button className='button button-delete' type='button' onClick={()=>this.handleDelete(id, this.props.stateIdx)}>Delete</button>
            {this.state.showModal && <ParentModal furbaby={adoptedName || shelterName} show={this.state.showModal} toggleModal={this.toggleModal} setParent={this.setParent} adoptionDate={adoptionDate}/>}
          </div>
        </div>
      )
    } else {
      return null;
    }
  }
}

const mapState = state => {
  return {
    furbabyDetail: state.furbabyDetail
  }
}

const mapDispatch = dispatch => ({ 
  deleteFurbaby(id, index) {
    dispatch(deleteFurbabyThunk(id, index))
  },
  clearCurr() {
    dispatch(clearCurrFurbaby())
  },
  updateFurbaby(parent, furbaby, index) {
    if (parent && parent.id !== furbaby.parentId) { //if new parent from db
      furbaby.parentId = parent.id;
      dispatch(updateFurbabyThunk(furbaby, index))
    } else if (parent && parent.id.length === 0) { //if new parent entered in form not in db
      const { id, ...parentInfo} = parent;
      dispatch(createParentThunk(parentInfo))
      .then(parent => {
        furbaby.parentId = parent.parent.id;
        dispatch(updateFurbabyThunk(furbaby, index));
      })
    } else {
      dispatch(updateFurbabyThunk(furbaby, index));
    }
  }
});


const FurbabyDetailModalContainer = connect(mapState, mapDispatch)(FurbabyDetailModal);
export default FurbabyDetailModalContainer;