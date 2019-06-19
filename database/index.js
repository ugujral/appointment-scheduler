const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/patients', { useNewUrlParser: true });

const { Schema } = mongoose;

const patientSchema = new Schema({
  patientId: { type: Number, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  email: { type: String },
  appointmentDate: { type: String },
  appointmentTime: { type: String },
});

const Patients = mongoose.model('Patients', patientSchema);

module.exports = Patients;
