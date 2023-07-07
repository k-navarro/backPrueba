const Usuario = require('../models/contacto')


 const obtenerContacto = async (req,res) =>{
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

 const obtenerContactoPorId = async(req,res) =>{
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario) {
          res.json(usuario);
        } else {
          res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

const agregarContacto = async(req,res) =>{
    try {
        console.log(req.body)
        const usuario = new Usuario(req.body);
        const nuevoUsuario = await usuario.save();
        res.status(201).json(nuevoUsuario);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }

};

 const editarContacto = async(req,res) =>{
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (usuario) {
          res.json(usuario);
        } else {
          res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

const eliminarContacto = async(req,res) =>{
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (usuario) {
          res.json({ mensaje: 'Usuario eliminado' });
        } else {
          res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

module.exports = {obtenerContacto,obtenerContactoPorId,agregarContacto,editarContacto, eliminarContacto}