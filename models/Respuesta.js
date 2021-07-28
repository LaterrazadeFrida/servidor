'use strict'

const mongoose = require('mongoose');


const RespuestaSchema = mongoose.Schema({
    idPregunta: {
        type: Number,
        require: true,
        trim: true
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    responde: {
        type: String,
        require: true,
        trim: true
    }
});

module.exports = mongoose.model('Respuesta', RespuestaSchema);



