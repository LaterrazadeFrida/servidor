const mongoose = require('mongoose');


const EstadoSchema = mongoose.Schema({

  nombreEstado: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('Estado', EstadoSchema);
