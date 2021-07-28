const Respuesta = require('../models/Respuesta');

exports.crearRespuesta = async (req, res) => {
    const { idUsuario} = req.body;
    try {
        //Revisar usuario regitrado unico
        let existe = await Respuesta.findOne({ idUsuario });

        if (existe) {
            return res.status(400).json({msg: 'YA TIENE UNA PREGUNTA DE SEGURIDAD REGISTRADA'});
        }
        //crea la nueva respuesta
        let respuesta = new Respuesta(req.body);
        await respuesta.save();
        res.json('PREGUNTA REGISTRADA CON EXITO');
    } catch (error) {
        console.log(error);
        res.status(400).send('HUBO UN ERROR');
    }
}