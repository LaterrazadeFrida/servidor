const Puntos= require('../models/Puntos');

exports.ingresarPuntos= async (req, res) => {
    try {
        //crea los puntos
        let puntos= new Puntos(req.body);
        await puntos.save();
        res.json(puntos);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.obtenerPuntos = async (req, res) => {
    try {
        const puntos = await Puntos.find({});
        res.json({ puntos });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.actualizarPuntos= async (req, res) => {
    var puntoId = req.params.id;
    var update = req.body;
    Puntos.findByIdAndUpdate(puntoId, update, { new: true }, (err, puntoActualizado) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar' });
        if (!puntoActualizado) return res.status(404).send({ message: 'No existen los puntos para actualizar' });
        return res.status(200).send({
            puntos: puntoActualizado
        });
    });

}

exports.eliminarPuntos= async (req, res) => {
    var puntosId = req.params.id;
    Puntos.findByIdAndRemove(puntosId, (err, puntosEliminados) => {
        if (err) return res.status(500).send({ message: 'No se ha podido borrar los puntos' });

        if (!puntosEliminados) return res.status(404).send({ message: "No se puede eliminar esos puntos." });

        return res.status(200).send({
            puntos: puntosEliminados
        });
    });
}

