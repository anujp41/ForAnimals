import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import FileDrop from 'react-file-drop';
import './FurbabyDetailModal.css';
const {currentStatusVals} = require('../assets');

class FurbabyDetailModal extends Component {

  constructor(props) {
    super(props);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.getAgeYYMM = this.getAgeYYMM.bind(this);
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
      imagesOtherURL: [],
      showFiles: false,
      showModal: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...nextProps.furbabyDetail
    }
  }

  getAgeYYMM(input) {
    const date = new Date(input);
    const today = new Date();
    const [todayYear, todayMonth] = [today.getFullYear(), today.getMonth()];
    const [dateYear, dateMonth] = [date.getFullYear(), date.getMonth()];
    let [ageYear, ageMonth] = [todayYear-dateYear, todayMonth-dateMonth];
    if (ageMonth < 0) {
      ageMonth = 12 + ageMonth;
      ageYear--;
    }
    this.setState({ ageYear, ageMonth });
  }

  componentDidUpdate(prevProps) {
    if (this.props.furbabyDetail.birthDate !== undefined && prevProps.furbabyDetail.birthDate === undefined) {
      this.getAgeYYMM(this.props.furbabyDetail.birthDate);
    }
  }

  onImageDrop(files) {
    const response = this.state.photo === null ? true : window.confirm('Do you want to replace the current photo?');
    if (response) {
      const photo = files[0];
      this.setState({ photo });
    }
  }

  render() {
    const { 
      shelterName,
      adoptedName,
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
    console.log('state ', this.state.photoUrl)
    const today = new Date().toISOString().split('T')[0];
    const selectOption = ['Yes', 'No', 'Unsure'];
    const status = currentStatusVals;
    return (
      <div className='backdrop-detail'>
        <button className='cancelbtn' onClick={this.props.closeModal}>
          Cancel
        </button>
        <div className='detail-container'>
          <form autoComplete='off' >

          <div className='title-detail'>See details for {adoptedName || shelterName}</div>
          <div className='sub-title-detail'>You can edit any detail as well here</div>

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
                onDrop={this.onImageDrop.bind(this)}>
                <p>Upload pictures</p>
                <p>(Limit One):</p>
                <img className='furbaby-photo' alt='' src={this.state.photo && this.state.photo.preview || this.state.photoUrl}/>
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
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    furbabyDetail: state.furbabyDetail
  }
}

const FurbabyDetailModalContainer = connect(mapState, null)(FurbabyDetailModal);
export default FurbabyDetailModalContainer;