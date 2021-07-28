//rutas crear usuarios
const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

//consultar estados
router.get('/',
  estadoController.obtenerEstados

);

module.exports = router;