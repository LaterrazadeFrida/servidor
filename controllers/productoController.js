const Producto= require('../models/Producto');
const { validationResult } = require('express-validator');

exports.crearProducto= async (req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    const { nombre } = req.body;
    try {
        //Revisar usuario regitrado unico
        let producto= await Producto.findOne({ nombre });

        if (producto) {
            return res.status(400).json({ msg: 'El producto ya existe' });
        }
        //crea el nuevo producto
        producto= new Producto(req.body);
        await producto.save();
        res.json(producto);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find({});
        res.json({ productos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

// Actualizar producto
exports.actualizarProducto= async (req, res) => {
    //reviar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    var productoId = req.params.id;
    var product = req.body;
    Producto.findByIdAndUpdate(productoId, product, { new: true }, (err, productoUpdated) => {
        if (err) return res.status(500).send({ msg: 'Error al actualizar' });
        if (!productoUpdated) return res.status(404).send({ message: 'No existe el producto para actualizar' });
        return res.status(200).send({producto: productoUpdated });
    });
}

exports.eliminarProducto= async (req, res) => {
    //reviar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    var productoId = req.params.id;

    Producto.findByIdAndRemove(productoId, (err, productoEliminado) => {
        if (err) return res.status(500).send({ message: 'No se ha podido borrar el producto' });

        if (!productoEliminado) return res.status(404).send({ message: "No se puede eliminar ese producto." });

        return res.status(200).send({
            servicio: productoEliminado
        });
    });
}


