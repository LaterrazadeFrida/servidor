const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const auth = require('../middleware/auth');

//generar consulta
router.post('/',
  auth,
  reporteController.generarConsulta
);

module.exports = router;