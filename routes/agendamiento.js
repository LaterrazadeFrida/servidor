//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const agendamientoController = require('../controllers/agendamientoController');


router.get('/:id',
  agendamientoController.validarUsuario
);

router.post('/',
  agendamientoController.crearCita
);


module.exports = router;
