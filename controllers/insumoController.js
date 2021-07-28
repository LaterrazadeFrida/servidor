const Producto = require("../models/Producto");

// Actualizar insumos
exports.actualizarInsumos = async (req, res) => {
  var _id = req.params.id;
  var gasto = req.body;
  let existente = await Producto.findById({ _id });

  if (existente.disponibles < gasto.cantidad) {
    return res.status(400).json({ msg: "NO HAY INSUMOS SUFICIENTES" });
  } else {
      existente.disponibles = existente.disponibles - gasto.cantidad;
  }

  Producto.findByIdAndUpdate(  _id,  existente, { new: true }, (err, productoUpdated) => {
      if (err) return res.status(500).send({ message: "Error al actualizar" });

      if (!productoUpdated)  return res  .status(404).send({ message: "No existe el producto para actualizar" });

      return res.status(200).send('REGISTRADO CON EXITO');
    }
  );
};
