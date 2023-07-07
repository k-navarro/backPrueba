const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombres: String,
    apellidos: String,
    email: String,
    telefono: String,
    fechaNacimiento: String,
    direccion: String,
    tipoContacto: String,
    origen: String,
  });
  
  module.export = mongoose.model('Usuario',usuarioSchema);