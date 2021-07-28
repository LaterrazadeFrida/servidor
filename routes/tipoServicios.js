//rutas crear usuarios
const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');

//consultar tipos
router.get('/',
    tipoController.obtenerTipos

);

module.exports = router;