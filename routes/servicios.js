//rutas crear usuarios
const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');



//Api/servicios  --crea servicio
router.post('/',
  auth,
  servicioController.crearServicio
);

//consultar servicios
router.get('/',
  servicioController.obtenerServicios

);

//modificar el servicio
router.put('/:id',
  auth,
  servicioController.actualizarServicio
);

//eliminar el servicio
router.delete('/:id',
  auth,
  servicioController.eliminarServicio

)


module.exports = router;