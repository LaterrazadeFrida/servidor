const Cita = require('../models/Cita');
exports.obtenerCitas = async (req, res) => {

    try {
        const citas = await Cita.find({}).sort({ horaInicio: -1 });
        res.json({ citas });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.eliminarCita= async (req, res) => {

    var citaId = req.params.id;

    Cita.findByIdAndRemove(citaId, (err, citaEliminada) => {
        if (err) return res.status(500).send({ message: 'No se ha podido borrar la cita' });

        if (!citaEliminada) return res.status(404).send({ message: "No se puede eliminar esta cita." });

        return res.status(200).send({
            cita: citaEliminada
        });
    });
}

exports.actualizarCita= async (req, res) => {

    var citaId = req.params.id;
    var update = req.body;

    Cita.findByIdAndUpdate(citaId, update, { new: true }, (err, citaActualizada) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar' });

        if (!citaActualizada) return res.status(404).send({ message: 'No existe la cita para actualizar' });

        return res.status(200).send({
            cita: citaActualizada
        });
    });

}