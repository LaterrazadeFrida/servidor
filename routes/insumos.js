//rutas para autenticar usuarios
const express = require("express");
const router = express.Router();
const insumoController = require("../controllers/insumoController");

//actualiza insumos
router.put("/:id", insumoController.actualizarInsumos);

module.exports = router;
