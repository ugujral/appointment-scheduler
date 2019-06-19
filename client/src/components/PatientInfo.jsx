/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import axios from 'axios';
import styles from '../styles/style.css';
import PatientAppointment from './PatientAppointment';

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => {
    if (val.length < 0) {
      valid = false;
    }
  });
  return valid;
};

class PatientInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: 1,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      appointmentDate: '',
      appointmentTime: '',
      minAppointmentDate: '',
      patientInfo: [],
      confirmation: false,
      errors: {
        firstName: '',
        lastName: '',
      },
    };
    this.onSubmitInfo = this.onSubmitInfo.bind(this);
    this.getPatientInfo = this.getPatientInfo.bind(this);
    this.postPatientInfo = this.postPatientInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidMount() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;
    this.setState({
      minAppointmentDate: today,
    });
  }

  onSubmitInfo(e) {
    e.preventDefault();
    this.validateForm();
    this.postPatientInfo();
  }

  getPatientInfo() {
    const { patientId } = this.state;
    axios
      .get(`/api/patient/${patientId}`)
      .then((response) => {
        this.setState({
          patientInfo: response.data,
          patientId: patientId + 1,
          confirmation: true,
        });
      })
      .catch(err => console.error(err));
  }

  postPatientInfo() {
    const {
      patientId,
      firstName,
      lastName,
      phoneNumber,
      email,
      appointmentDate,
      appointmentTime,
    } = this.state;
    axios
      .post(`/api/patient/${patientId}`, {
        patientId,
        firstName,
        lastName,
        phoneNumber,
        email,
        appointmentDate,
        appointmentTime,
      })
      .then(() => {
        this.getPatientInfo();
      })
      .catch(err => console.error(err));
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { errors } = this.state;

    switch (name) {
      case 'firstName':
        errors.firstName = value.length < 3 ? 'First name is required' : '';
        break;
      case 'lastName':
        errors.lastName = value.length < 3 ? 'Last name is required' : '';
        break;
      default:
        break;
    }

    this.setState({
      [name]: value,
      confirmation: false,
    });
  }

  validateForm() {
    const { errors } = this.state;
    if (validateForm(errors)) {
      console.log('Valid Form');
    } else {
      console.error('Invalid Form');
    }
  }

  render() {
    const { patientInfo, confirmation, minAppointmentDate } = this.state;
    return (
      <div className={styles.patientInfo}>
        <form>
          <div className={styles.firstName}>
            <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.handleChange} required />
          </div>
          <div className={styles.lastName}>
            <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.handleChange} required />
          </div>
          <div className={styles.phoneNumber}>
            <input type="tel" name="phoneNumber" id="phoneNumber" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone Number" onChange={this.handleChange} required />
          </div>
          <div className={styles.email}>
            <input type="email" name="email" id="email" pattern="[a-zA-Z]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}" placeholder="Email" onChange={this.handleChange} required />
          </div>
          <div className={styles.appointmentDate}>
            <input type="date" min={minAppointmentDate} max="2019-12-31" value={minAppointmentDate} name="appointmentDate" id="appointmentDate" placeholder="Appointment Date" onChange={this.handleChange} required />
          </div>
          <div className={styles.appointmentTimes}>
            <p>Please select your preferred time:</p>
            <div>
              <input type="radio" name="appointmentTime" value="09:00 AM - 10:00 AM" onChange={this.handleChange} checked />
              {' '}
              09:00 AM - 10:00 AM
              <br />
            </div>
            {/* <div>
              <input type="radio" name="appointmentTime" value="10:00 AM - 11:00 AM" onChange={this.handleChange} />
              {' '}
              10:00 AM - 11:00 AM
              <br />
            </div> */}
            <div>
              <input type="radio" name="appointmentTime" value="11:00 AM - 12:00 PM" onChange={this.handleChange} />
              {' '}
              11:00 AM - 12:00 PM
              <br />
            </div>
            <div>
              <input type="radio" name="appointmentTime" value="01:00 PM - 02:00 PM" onChange={this.handleChange} />
              {' '}
              01:00 PM - 02:00 PM
              <br />
            </div>
            <div>
              <input type="radio" name="appointmentTime" value="02:00 PM - 03:00 PM" onChange={this.handleChange} />
              {' '}
              02:00 PM - 03:00 PM
              <br />
            </div>
            {/* <div>
              <input type="radio" name="appointmentTime" value="03:00 PM - 04:00 PM" onChange={this.handleChange} />
              {' '}
              03:00 PM - 04:00 PM
              <br />
            </div> */}
          </div>
          <button type="button" onClick={e => this.onSubmitInfo(e)}>Confirm</button>
        </form>
        <div className={styles.patientAppointment}>
          {confirmation
            ? <PatientAppointment currentPatientInfo={patientInfo} /> : ''
          }
        </div>
      </div>
    );
  }
}

export default PatientInfo;
