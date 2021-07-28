'use strict'

const mongoose = require('mongoose');


const ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        require: true,
        trim: true
    },
    fechaCompra: {
        type: Date,
        trim: true,
        require: true
    },
    fechaActualizacion: {
        type: Date,
        trim: true,
    },
    disponibles: {
        type: Number,
        require: true,
        trim: true
    },
    estado: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Producto', ProductosSchema);
// productos --> guarda los documents en la coleccion
