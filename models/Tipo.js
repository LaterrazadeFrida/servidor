const mongoose = require('mongoose');


const TipoSchema = mongoose.Schema({

  nombreTipo: {
    type: String,
    required: true,
    trim: true
  },

  creado: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Tipo', TipoSchema);
