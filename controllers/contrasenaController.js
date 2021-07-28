const Usuario = require('../models/Usuario');
const Respuesta = require('../models/Respuesta');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');




exports.validarUsuario = async (req, res) => {


    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        console.log(errores);
        return res.status(400).json({ errores: errores.array() });
    }

    const { documento, idPregunta, responde } = req.body;

    try {

        //revisar que el usuario si exista
        let usuario = await Usuario.findOne({ documento });
        if (!usuario) {
            return res.status(400).json({ msg: 'EL USUARIO NO ESTA REGISTRADO'});
        }

        let pregunta = await Respuesta.findOne({ idPregunta: idPregunta, idUsuario: usuario._id });

        if (!pregunta || pregunta.responde.toLowerCase() !== responde.toLowerCase()) {
            return res.status(400).json({ msg: 'LA PREGUNTA Y/O RESPUESTA SON INCORRECTAS'});
        }

        //confirmacion
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(400).send('HUBO UN ERROR');
    }
}

// Actualizar producto
exports.actualizarContraseña= async (req, res) => {

    //reviar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    var usuarioId = req.params.id;
    var usuario = req.body;

     //hashear el password
     const salt = await bcryptjs.genSalt(10);
     usuario.contraseña = await bcryptjs.hash(usuario.contraseña, salt);


    Usuario.findByIdAndUpdate(usuarioId, usuario, { new: true }, (err, usuarioUpdated) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar' });

        if (!usuarioUpdated) return res.status(404).send({ message: 'No existe el usuario para actualizar' });

        return res.status(200).send('CONTRASEÑA ACTUALIZADA CON EXITO');
    });

}



