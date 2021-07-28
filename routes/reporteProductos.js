const express = require('express');
const router = express.Router();
const reporteProductosController = require('../controllers/reporteProductosController');
const auth = require('../middleware/auth');

//generar consulta
router.post('/',
  auth,
  reporteProductosController.generarConsultaProductos
);

module.exports = router;