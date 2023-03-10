const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    userName: 'required|string',
    password: 'required|min:6',
    email: 'required|email',
    phoneNumber: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveGoal = (req, res, next) => {
  const validationRule = {
    userName: 'required|string',
    goalName: 'required|string',
    startDate: 'required|string',
    endDate: 'required|string',
    plan: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {saveUser, saveGoal};