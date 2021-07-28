//rutas crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


//crea usuario

//Api/usuarios
router.post('/',

  [
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'Agregar correo valido').isEmail()
  ],
  usuarioController.crearUsuario
);

//consultar empleados
router.get('/',
  usuarioController.obtenerClientes

);



module.exports = router;