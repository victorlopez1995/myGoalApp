const mongodb = require("../db/mongodb");
const ObjectId = require('mongodb').ObjectId;
const passwordUtil = require('../util/passwordComplexityCheck');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb()
    .db()
    .collection('user')
    .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
}

const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid user id to find a user.');
    return
  }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('user')
      .find({ _id: userId });
    result.toArray().then((err,lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }else{
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
      }
    });
  };

  const createSingle = async (req, res, next) => {
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: hash,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      goals: req.body.goals
    };

    const createUser = await mongodb
    .getDb()
    .db()
    .collection('user')
    .insertOne(user).then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error)})
  }

  const updateSingle = async (req, res, next) =>{
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a user.');
      return;
    }else{
      const password = req.body.password;
      const passwordCheck = passwordUtil.passwordPass(password);
      if (passwordCheck.error) {
        res.status(400).send({ message: passwordCheck.error });
        return;
      }
    const userId = new ObjectId(req.params.id);
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      password: hash,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      goals: req.body.goals
    };
    const update = await mongodb
    .getDb()
    .db()
    .collection('user')
    .replaceOne({_id: userId}, user).then(result =>{
      res.status(204).send();
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error);
    })
    }
  }

  const deleteSingle = async (req, res, next) =>{
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a user.');
      return;
    }
    const userId = new ObjectId(req.params.id);
    const contact = req.body;
    const deleteContact = await mongodb
    .getDb()
    .db()
    .collection('user')
    .deleteOne({_id: userId}).then(result =>{
      res.status(200).send();
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error);
    })
  }

module.exports = { getAll, getSingle, createSingle, updateSingle, deleteSingle};