//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


//Iniciar sesion usuario
//Api/auth
router.post('/',
  [
    check('documento', 'El documento es obligatorio').not().isEmpty(),
    check('contraseña', 'la contraseña debe ser minimo 6 caracteres').isLength({ min: 6 })

  ],
  authController.autenticarUsuario
);

//Api/auth  obtener el usuario
router.get('/',
  auth,
  authController.usuarioAutenticado
);


module.exports = router;
