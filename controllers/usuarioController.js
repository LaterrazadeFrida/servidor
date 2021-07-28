const Usuario = require('../models/Usuario');
const Role = require('../models/Role');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {

    //revisar si hay errores

    //validation result resultado de validacion de routes usuarios
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { documento } = req.body;
    try {
        //Revisar usuario regitrado unico
        let usuario = await Usuario.findOne({ documento });

        if (usuario) {
            return res.status(400).json({ msg: 'El USUARIO YA EXISTE' });
        }

        //crea el nuevo usuario
        usuario = new Usuario(req.body);

        // checking for roles
        if (!req.body.rol) {
            const role = await Role.findOne({ nombre: "Cliente" });
            usuario.rol = [role._id];
        }

        //guarda el nuevo usuario bd 
        await usuario.save();

        res.json('CLIENTE REGISTRADO CON EXITO');

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}


//consulta todos los empleados registados en la bd
exports.obtenerClientes = async (req, res) => {
    try {
        const usuarios = await Usuario.find({rol: '60f4ba3418bcb70ffca87c9e'});
        res.json({ usuarios });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}



