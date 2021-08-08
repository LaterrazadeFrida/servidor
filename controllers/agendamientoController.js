const Usuario = require('../models/Usuario');
const Cita = require('../models/Cita');

exports.validarUsuario = async (req, res) => {
    var documento = req.params.id;
    try {
        //revisar que el usuario si exista
        let usuario = await Usuario.findOne({documento, rol: '60f4ba3418bcb70ffca87c9e'});
        if (!usuario) {
            return res.status(400).json({ msg: 'EL USUARIO NO ESTA REGISTRADO' });
        }
        //confirmacion
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(400).send('HUBO UN ERROR');
    }
}

//registra citas en la bd
exports.crearCita = async (req, res) => {
    try {
        cita = new Cita(req.body);
        let inicioEnviado = cita.horaInicio;
        let finalEnviado = cita.horaFin;
        let docEmplEnvi = cita.docEmpleado;
        let noDispo = await Cita.find({
            $or:
                [
                    {
                        $and: [
                            { horaInicio: { $gte: new Date(inicioEnviado) } },
                            { horaInicio: { $lt: new Date(finalEnviado) } }
                        ]
                    },
                    {
                        $and: [
                            { horaFin: { $gt: new Date(inicioEnviado) } },
                            { horaFin: { $lt: new Date(finalEnviado) } }
                        ]
                    },
                    {
                        $and: [
                            { horaInicio: { $lt: new Date(inicioEnviado) } },
                            { horaFin: { $gt: new Date(finalEnviado) } }
                        ]
                    },
                ]
        }
        );
        let result = noDispo.filter(cita => cita.docEmpleado === docEmplEnvi);

        if (result.length !== 0) {
            return res.status(400).json({ msg: 'LAS FECHAS SE CRUZAN EN LA AGENDA' });
        }

        //guarda en bd
        await cita.save();

        res.json('CITA AGENDADA CON EXITO');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
