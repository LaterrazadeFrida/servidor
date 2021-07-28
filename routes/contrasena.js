//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const contrasenaController = require('../controllers/contrasenaController');


router.post('/',
  [
    check('documento', 'El documento es obligatorio').not().isEmpty(),

  ],
  contrasenaController.validarUsuario
);


//actualiza productos
router.put('/:id',
  contrasenaController.actualizarContraseña
);



module.exports = router;
