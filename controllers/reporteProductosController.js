
const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

exports.generarConsultaProductos = async (req, res) => {  

    try {
        let Productos = await Producto.find({}).sort({ disponibles: 1 });;

        let productosActivos = Productos.filter(producto => producto.estado == 'Activo')

        res.json(productosActivos);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }


}