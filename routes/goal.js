const express = require("express");
const router = express.Router();
const goalController = require("../controller/goal");
const validation = require('../middleware/validate');

router.get('/', goalController.getAll);

router.get('/:id', goalController.getSingle);

router.post('/',validation.saveUser, goalController.createSingle);

router.put('/:id',validation.saveUser, goalController.updateSingle);

router.delete('/:id', goalController.deleteSingle);

module.exports = router;