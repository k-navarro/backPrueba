const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Habilitar CORS para todas las rutas
app.use(cors());

// Conexión a la base de datos
mongoose.connect('mongodb+srv://kevin:wa5wZ98pHYgOFx7X@cluster0.cuhsavp.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Middleware para manejar el cuerpo de las solicitudes
app.use(express.json());

// Definición del modelo de Usuario
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
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rutas CRUD para Usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/usuarios/:id', async (req, res) => {
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
});

app.post('/usuario', async (req, res) => {
  try {
    console.log(req.body)
    const usuario = new Usuario(req.body);
    const nuevoUsuario = await usuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/usuario/:id', async (req, res) => {
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
});

app.delete('/usuario/:id', async (req, res) => {
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
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});