const express = require("express");
const router = express.Router();
const goalController = require("../controller/goal");
const validation = require('../middleware/validate');

router.get('/', goalController.getAll);

router.get('/:id', goalController.getSingle);

router.post('/',validation.saveGoal, goalController.createSingle);

router.put('/:id',validation.saveGoal, goalController.updateSingle);

router.delete('/:id', goalController.deleteSingle);

module.exports = router;