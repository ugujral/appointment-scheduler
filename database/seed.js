const mongoose = require('mongoose');

const Patients = require('./index.js');
const patientData = require('./data.json');

const seedFunction = (data) => {
  Patients.insertMany(data)
    .then(() => {
      mongoose.connection.close();
    })
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
};

seedFunction(patientData);
