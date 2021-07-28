const Cita = require('../models/Cita');

exports.generarConsulta = async (req, res) => {
    const { fechaInicio, fechaFinal } = req.body;

    try {
        let citas = await Cita.find({
            $expr: {
                $and: [
                    { $gte: [{ $year: "$horaInicio" }, { $year: new Date(fechaInicio) }] },
                    { $gte: [{ $month: "$horaInicio" }, { $month: new Date(fechaInicio) }] },
                    { $gte: [{ $dayOfMonth: "$horaInicio" }, { $dayOfMonth: new Date(fechaInicio) }] },
                    { $lte: [{ $year: "$horaInicio" }, { $year: new Date(fechaFinal) }] },
                    { $lte: [{ $month: "$horaInicio" }, { $month: new Date(fechaFinal) }] },
                    { $lte: [{ $dayOfMonth: "$horaInicio" }, { $dayOfMonth: new Date(fechaFinal) }] }
                ]
            }
        }).sort({ costo: -1 });

        let cumplidas = citas.filter(cita => cita.Estado == 'Cumplida');

        if (cumplidas.length === 0) {
            return res.status(400).json({ msg: 'NO SE ENCONTRARON DATOS' });
        }
        res.json(cumplidas);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }


}

