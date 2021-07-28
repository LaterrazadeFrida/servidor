'use strict'

const mongoose = require('mongoose');


const CitaSchema = mongoose.Schema({
    docCliente: {
        type: String,
        require: true,
        trim: true
    },
    Servicio: {
        type: String,
        require: true,
        trim: true
    },
    docEmpleado: {
        type: Number,
        require: true,
        trim: true
    },
    horaInicio: {
        type: Date,
        require: true,
    },
    horaFin: {
        type: Date,
        require: true,
    },
    costo: {
        type: Number,
        require: true,
        trim: true
    },
    Estado: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('Cita', CitaSchema);

