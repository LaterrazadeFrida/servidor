const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/rolesController');



//Api/rol
router.post('/',
    rolesController.crearRol
);


module.exports = router;