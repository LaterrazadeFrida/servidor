//rutas crear usuarios
const express = require("express");
const router = express.Router();
const puntosController = require("../controllers/puntosController");

router.post("/", puntosController.ingresarPuntos);

router.get("/", puntosController.obtenerPuntos);

//actualiza 
router.put("/:id", puntosController.actualizarPuntos);

router.delete("/:id", puntosController.eliminarPuntos);

module.exports = router;
