const Usuario = require('../models/Usuario');
const Role = require('../models/Role');
const Estado = require('../models/Estado');
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

        if (!req.body.estado) {
            const estado = await Estado.findOne({ nombreEstado: "Activo" });
            usuario.estado = [estado._id];
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

// Actualizar cliente
exports.actualizarCliente= async (req, res) => {
    var clienteId = req.params.id;
    var cliente = req.body;
    Usuario.findByIdAndUpdate(clienteId, cliente, { new: true }, (err, clienteUpdated) => {
        if (err) return res.status(500).send({ msg: 'Error al actualizar' });
        if (!clienteUpdated) return res.status(404).send({ msg: 'No existe el cliente para actualizar' });
        return res.status(200).send({cliente: clienteUpdated });
    });
}

