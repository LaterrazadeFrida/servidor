const bcryptjs = require('bcryptjs');
const Role = require('../models/Role');
const Usuario = require('../models/Usuario');
const { validationResult } = require('express-validator');

//registra empleados en la bd
exports.crearEmpleado = async (req, res) => {
    //revisar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    const { documento, contraseña , correo} = req.body;
    try {
        //Revisar usuario regitrado unico
        let usuario = await Usuario.findOne({ documento });
        let existeCorreo = await Usuario.findOne({ correo });

        if (usuario) {
            return res.status(400).json({ msg: 'YA HAY UN USUARIO REGISTRADO CON ESE DOCUMENTO DE IDENTIDAD'});
        }
        if (existeCorreo) {
            return res.status(400).json({ msg: 'YA HAY UN USUARIO REGISTRADO CON ESE CORREO ELECTRÓNICO'});
        }
        //crea el nuevo Empleado
        usuario = new Usuario(req.body);
        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.contraseña = await bcryptjs.hash(contraseña, salt);
        const role = await Role.findOne({ nombre: "Empleado" });
        usuario.rol = [role._id];
        //guarda en bd
        await usuario.save();
        res.json('EMPLEADO CREADO CON EXITO');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

//consulta todos los empleados registados en la bd
exports.obtenerEmpleados = async (req, res) => {
    try {
        const empleados = await Usuario.find({rol: '60f4ba2518bcb70ffca87c9d'});
        res.json({ empleados });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
//eliminar un empleado
exports.eliminarEmpleado = async (req, res) => {

    //reviar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    var empleadoId = req.params.id;
    Empleado.findByIdAndRemove(empleadoId, (err, empleadoEliminado) => {
        if (err) return res.status(500).send({ message: 'No se ha podido borrar el empleado' });

        if (!empleadoEliminado) return res.status(404).send({ message: "No se puede eliminar ese empleado." });

        return res.status(200).send({
            empleado: empleadoEliminado
        });
    });
}


// Actualizar empleado
exports.actualizarEmpleado = async (req, res) => {

    //reviar si hay errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    var empleadoId = req.params.id;
    var update = req.body;

    Usuario.findByIdAndUpdate(empleadoId, update, { new: true }, (err, empleadoActualizado) => {
        if (err) return res.status(500).send({ message: 'Error al actualizar' });

        if (!empleadoActualizado) return res.status(404).send({ message: 'No existe el empleado para actualizar' });

        return res.status(200).send({
            empleado: empleadoActualizado
        });
    });

}
