const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const validation = require('../middleware/validate');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.post('/',validation.saveUser, userController.createSingle,  (req, res) => {
    console.log("hola");
});

router.put('/:id',validation.saveUser, userController.updateSingle);

router.delete('/:id', userController.deleteSingle);

module.exports = router;