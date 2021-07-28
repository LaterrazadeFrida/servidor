//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');

router.post('/',
  consultasController.obtenerAgendamientos
);


module.exports = router;
