import React from 'react';
import PropTypes from 'prop-types';

const PatientAppointment = ({ currentPatientInfo }) => {
  const appointmentDateFix = `${currentPatientInfo.appointmentDate.slice(5)}-2019`;
  return (
    <div>
      <h3>
        Congratulations
        {' '}
        {currentPatientInfo.firstName}
        , your appointment is set for
        {' '}
        {appointmentDateFix}
        {' '}
        at
        {' '}
        {currentPatientInfo.appointmentTime}
        .
      </h3>
    </div>
  );
};

PatientAppointment.propTypes = {
  currentPatientInfo: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.object,
    patientId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    appointmentDate: PropTypes.string,
    appointmentTime: PropTypes.string,
  })),
};

PatientAppointment.defaultProps = {
  currentPatientInfo: {},
};


export default PatientAppointment;
