const router = require('express').Router();

const controller = require('./controller');

router
  .route('/patients')
  .get(controller.getAll);

router
  .route('/patient/:patientId')
  .get(controller.getOne)
  .post(controller.post)
  .delete(controller.delete);


module.exports = router;
