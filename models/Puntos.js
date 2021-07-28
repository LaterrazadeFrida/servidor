const mongoose = require('mongoose');

const PuntoSchema = mongoose.Schema({
   docCliente: {
      type: String,
      required: true,
      trim: true
   },
   cantidad: {
      type: Number,
      required: true,
      trim: true
   },
   estado: {
      type: String,
      required: true,
      trim: true
   },
   creado: {
      type: Date,
      default: Date.now()
   }
});

module.exports = mongoose.model('Punto', PuntoSchema);
