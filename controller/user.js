const mongodb = require("../db/mongodb");
const ObjectId = require('mongodb').ObjectId;

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
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('user')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  const createSingle = async (req, res, next) => {
    const contact = req.body;
    const createContact = await mongodb
    .getDb()
    .db()
    .collection('user')
    .insertOne(contact).then(result => {
      res.status(201).json(result);
    })
    .catch(error => console.error(error))
  }

module.exports = { getAll, getSingle, createSingle};