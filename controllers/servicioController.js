const Servicio = require('../models/Servicio');
const { validationResult } = require('express-validator');

exports.crearServicio = async (req, res) => {

    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { nombre } = req.body;

    try {

        //Revisar usuario regitrado unico
        let servicio = await Servicio.findOne({ nombre });

        if (servicio) {
            return res.status(400).json({ msg: 'El servicio ya existe' });
        }

        //crea el nuevo servicio
        servicio = new Servicio(req.body);

        await servicio.save();

        res.json('SERVICIO CREADO CON EXITO');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }


}

exports.obtenerServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find({});
        res.json({ servicios });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

// Actualizar servicio
exports.actualizarServicio = async (req, res) => {

    //reviar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    var servicioId = req.params.id;
    var update = req.body;

    Servicio.findByIdAndUpdate(servicioId, update, { new: true }, (err, servicioUpdated) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar' });

        if (!servicioUpdated) return res.status(404).send({ message: 'No existe el servicio para actualizar' });

        return res.status(200).send({
            servicio: servicioUpdated
        });
    });

}

exports.eliminarServicio = async (req, res) => {

    //reviar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    var servicioId = req.params.id;

    Servicio.findByIdAndRemove(servicioId, (err, serviceRemoved) => {
        if (err) return res.status(500).send({ message: 'No se ha podido borrar el servicio' });

        if (!serviceRemoved) return res.status(404).send({ message: "No se puede eliminar ese servicio." });

        return res.status(200).send({
            servicio: serviceRemoved
        });
    });
}


