const Patients = require('../database/index');

const controller = {
  getAll: (req, res) => {
    Patients.find({ })
      .sort({ patientId: 1 })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  getOne: (req, res) => {
    const { patientId } = req.params;
    Patients.findOne({ patientId })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  post: (req, res) => {
    Patients.create(req.body)
      .then(() => {
        res.status(201).send('POSTED');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
  delete: (req, res) => {
    const { patientId } = req.params;
    Patients.deleteOne({ patientId })
      .then(() => {
        res.status(202).send('DELETED');
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },
};

module.exports = controller;
