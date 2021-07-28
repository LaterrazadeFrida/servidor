//rutas crear usuarios
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


//crea producto
//Api/productos
router.post('/',
  auth,
  productoController.crearProducto
);

//obtiene productos
router.get('/',
  productoController.obtenerProductos

);

//actualiza productos
router.put('/:id',
  productoController.actualizarProducto
);

//eliminar productos
router.delete('/:id',
  productoController.eliminarProducto

)


module.exports = router;