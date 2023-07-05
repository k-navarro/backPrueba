const express = require('express');
const contactoController = require('../../controllers/contactoController')
const router = express.Router();

router.post('/usuario', contactoController.agregarContacto);
router.get('/usuarios', contactoController.obtenerContacto);
router.get('/usuario/:id', contactoController.editarContacto);
router.put('/usuario/:id', contactoController.editarContacto);
router.delete('/usuario/:id',contactoController.eliminarContacto);

module.export = router;