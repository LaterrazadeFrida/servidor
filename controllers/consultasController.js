const Cita = require('../models/Cita');

exports.obtenerAgendamientos = async (req, res) => {
    const { doc, fecha } = req.body;
    try {
        let cadenaTexto = fecha;

        let fragmentoTexto = cadenaTexto.split('T');
        let formatFecha = fragmentoTexto[0];

        let citas = await Cita.find({
            $expr: {
                $and: [
                    { $eq: [{ $year: "$horaInicio" }, { $year: new Date(formatFecha) }] },
                    { $eq: [{ $month: "$horaInicio" }, { $month: new Date(formatFecha) }] },
                    { $eq: [{ $dayOfMonth: "$horaInicio" }, { $dayOfMonth: new Date(formatFecha) }] }
                ],
            }
        });

        const result = citas.filter(cita => cita.docEmpleado == doc);

        if (result.length === 0) {
            return res.status(400).json({ msg: 'EL EMPLEADO NO TIENE CITAS PARA ESTE DÍA' });
        }
        //confirmacion
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.status(400).send('HUBO UN ERROR');
    }
}
