const express = require('express');
const router = express.Router();
const reporteEdadController = require('../controllers/reporteEdadesController');
const auth = require('../middleware/auth');

//generar consulta
router.post('/',
  auth,
  reporteEdadController.generarConsultaEdades
);

module.exports = router;