const mongodb = require("../db/mongodb");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb()
    .db()
    .collection('goal')
    .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
}

const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid goal id to find a goal.');
    return;
  }
    const goalId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('goal')
      .find({ _id: goalId });
    result.toArray().then((err,lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);  
    })
  };

  const createSingle = async (req, res, next) => {
    const goal = {
        userName: req.body.userName,
        goalName: req.body.goalName,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        plan: req.body.plan
    };

    const creategoal = await mongodb
    .getDb()
    .db()
    .collection('goal')
    .insertOne(goal).then(result => {
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
    const goalId = new ObjectId(req.params.id);
    const goal = {
      userName: req.body.userName,
      goalName: req.body.goalName,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      plan: req.body.plan
    };
    const update = await mongodb
    .getDb()
    .db()
    .collection('goal')
    .replaceOne({_id: goalId}, goal).then(result =>{
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
    const goalId = new ObjectId(req.params.id);
    const goal = req.body;
    const deleteGoal = await mongodb
    .getDb()
    .db()
    .collection('goal')
    .deleteOne({_id: goalId}).then(result =>{
      res.status(200).send();
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error);
    })
  }

module.exports = { getAll, getSingle, createSingle, updateSingle, deleteSingle};