//rutas crear usuarios
const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

//consultar citas
router.get('/',
    citaController.obtenerCitas
);

//eliminar citas
router.delete('/:id',
    citaController.eliminarCita

)

//actualiza citas
router.put('/:id',
    citaController.actualizarCita
);

module.exports = router;