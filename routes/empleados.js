//rutas crear usuarios
const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController =   require ('../controllers/authController');

//Api/empleados  --crea un empleado
router.post('/',
  auth,
  authController.isAdmin,
  empleadoController.crearEmpleado
);

//consultar empleados
router.get('/',
  auth,
  empleadoController.obtenerEmpleados

);

//eliminar empleado
router.delete('/:id',
  auth,
  empleadoController.eliminarEmpleado

)

//modificar el empleado
router.put('/:id',
auth,
empleadoController.actualizarEmpleado
);

module.exports = router;