
const express = require('express');
const router = express.Router();
const respuestaController = require('../controllers/respuestaController');




//agregar respuesta
router.post('/',
    respuestaController.crearRespuesta

);


module.exports = router;