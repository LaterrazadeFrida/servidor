const mongoose = require('mongoose');

const ServicioSchema = mongoose.Schema({
   nombre: {
      type: String,
      required: true,
      trim: true
   },
   precio: {
      type: Number,
      required: true,
      trim: true
   },
   imagen: {
      type: String,
      trim: true
   },
   duracion: {
      type: Number,
      required: true,
      trim: true
   },
   tipo: {
      type: String,
      required: true,
      trim: true
   },
   creado: {
      type: Date,
      default: Date.now()
   }
});

module.exports = mongoose.model('Servicio', ServicioSchema);
