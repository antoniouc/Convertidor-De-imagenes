// routes/registro.js
const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de registro
router.get('/', (req, res) => {
    res.render('registroUsuario', { title: 'Registro',messages: req.flash()});
});

module.exports = router;