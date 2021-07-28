'use strict'

const mongoose = require('mongoose');


const UsuariosSchema = mongoose.Schema({
    tipo: {
        type: String,
        require: true,
        trim: true
    },
    documento: {
        type: String,
        require: true,
        trim: true
    },
	nombres: {
        type: String,
        require: true,
        trim: true
    },
    apellidos: {
        type: String,
        require: true,
        trim: true
    },
    correo: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    telefono: {
        type: Number,
        require: true,
        trim: true
    },
    fecha: {
        type: Date,
        require: true,
        trim: true
    },
    perfil: {
        type: String,
        trim: true
    },
    contraseña: {
        type: String,
        trim: true
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);
