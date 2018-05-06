import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Input.css';
import Dropzone from 'react-dropzone';
import firebase from '../firebase';
import $ from 'jquery';

const baseState = {
  name: '',
  breed: '',
  ageYear: 0,
  ageMonth: 0,
  sex: 'M',
  sexBoolean: false,
  arrived: '',
  comments: '',
  photo: null,
  photoUrl: '',
  spayed: false,
  fivpositive: false,
  fostered: false,
  adopted: false,
  parentId: null,
  showModal: false
}

class FurbabyUpdateModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...baseState
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
      arrived: new Date().toISOString().split('T')[0],
      parentId: null
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
    if (name === 'fostered' || name ===  'adopted') this.toggleModal(target.checked);
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { name, breed, ageYear, ageMonth, sex, sexBoolean, arrived, comments, photoUrl, spayed, fivpositive, fostered, adopted, parentId } = {...nextProps.currUpdateFurbaby};
    return {
      name, breed, ageYear, ageMonth, sex, sexBoolean, arrived, comments, photoUrl, spayed, fivpositive, fostered, adopted, parentId
    }
  }

  render() {
    console.log('state is ', this.state);
    if (!this.props.show) return null;
    // const { name, breed, ageYear, ageMonth, sexBoolean, arrived, comments, photoUrl, spayed, fivpositive, fostered, adopted } = this.state.furbaby;
    // console.log('name is ', name);
    const today = new Date().toISOString().split('T')[0];
    return (
      <div className='backdrop'>
        <div className='container'>
          <h1>hello!</h1>
        </div>
      </div>
    )
    // return (
    //   <div className='backdrop'>
    //     <button className='cancelbtn' onClick={this.props.toggleModal}>
    //       Cancel
    //     </button>
    //     <div className='container'>

    //       <form autoComplete="off" onSubmit={this.handleSubmit}>

    //         <div className="title">Update existing information for {name}:</div>

    //         <div className="general">

    //           <div className='formfield'>
    //             <input required className="input" type="text" name="name" value={name} onChange={this.handleChange}/>
    //             <div className="label-text">Name</div>
    //           </div>

    //           <div className='formfield'>
    //             <input required className="input" type="text" name="breed" value={breed} onChange={this.handleChange}/>
    //             <div className="label-text">Breed</div>
    //           </div>

    //           <div className='formfield'>
    //             <input readOnly className="input" name="age"/>
    //             <div className="label-text" type="age">Age</div>
    //             <div className='ageEntry'>
    //               <input required type="number" min="0" max="20" className="years" name="ageYear" value={ageYear} onChange={this.handleChange}/>
    //               <span>Years</span>
    //               <input required type="number" min="0" max="12" className="months" name="ageMonth" value={ageMonth} onChange={this.handleChange}/>
    //               <span>Months</span>
    //             </div>
    //           </div>

    //           <div className='formfield'>
    //             <input readOnly className="input"/>
    //             <div className="label-text" type="sex">Sex</div>
    //             <div className='sexEntry'>
    //               <label className="switch">
    //                 <input className="input" type="checkbox" checked={sexBoolean} name='sex' onChange={this.handleChange}/>
    //                 <div className="slider" type="sex"></div>
    //               </label>
    //             </div>
    //           </div>

    //         </div>

    //         <div className='formfield date-input'>
    //           <div className='date-field'>Date brought to shelter!</div>
    //           <input required className="input arrived" type="date" name="arrived" value={arrived} max={today} onChange={this.handleChange}/>
    //           <span className="isValid"></span>
    //         </div>

    //         <div className='comment'>
    //             <textarea className='commentInput' maxLength='200' type="text" row='3' name="comments" value={comments} placeholder='Additional comments on health/appearance etc.' onChange={this.handleChange}/>
    //             <div className='charactersLeft'>200 character(s) remaining</div>
    //           </div>

    //         <div className="dropzone">
    //           <Dropzone
    //             multiple={false}
    //             accept="image/*"
    //             style={dropzoneStyle} 
    //             onDrop={this.onImageDrop.bind(this)}>
    //             <p>Click to select a picture.</p>
    //             <img alt="" src={photoUrl}/>
    //           </Dropzone>
    //         </div>

    //         <div className='health'>
    //             <div className='healthTitle'>Health Info for furbaby</div>
    //             <div className='flexContainer'>

    //             <div className='flexItem'>
    //               <div className='flexQ'>Is the furbaby spayed?</div><br/>
    //               <label className="switch">
    //                 <input className="input" type="checkbox" checked={spayed} name='spayed' onChange={this.handleChange}/>
    //                 <div className="slider"></div>
    //               </label>
    //             </div>

    //             <div className='flexItem'>
    //               <div className='flexQ'>FIV Positive?</div><br/>
    //               <label className="switch">
    //                 <input className="input" type="checkbox" checked={fivpositive} name='fivpositive' onChange={this.handleChange}/>
    //                 <div className="slider"/>
    //               </label>
    //             </div>
                
    //           </div>
    //         </div>

    //         <div className='foster'>
    //           <div className='fosterdiv'>
    //             <div className='fosterQ'>Furbaby fostered?</div>
    //             <input className='input fostercheck' type='checkbox' name='fostered' checked={fostered} onChange={this.handleChange}/>
    //           </div>
    //         </div>

    //         <div className='adopt'>
    //           <div className='adoptdiv'>
    //             <div className='adoptQ'>Furbaby adopted?</div>
    //             <input className='input adoptcheck' type='checkbox' name='adopted' checked={adopted} onChange={this.handleChange}/>
    //           </div>
    //         </div>

    //         <button className='button' type="submit" value="submit">Submit</button>
              
    //       </form>

    //     </div>
    //   </div>
    // )
  }
}

const mapState = state => {
  return {
    currUpdateFurbaby: state.currUpdateFurbaby
  }
}

const FurbabyUpdateModalContainer = connect(mapState, null)(FurbabyUpdateModal);
export default FurbabyUpdateModalContainer;

const dropzoneStyle = {
  display: 'flexbox',
  justifyContent: 'center',
  alignItems: 'center',
  height : '20%',
  border : 'none'
};