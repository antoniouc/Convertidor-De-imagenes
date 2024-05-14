const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middlewares/authenticateUser');
const imagencontroll = require('../controller/imagenController');

// Rutas protegidas
router.get('/', authMiddleWare.authenticate, async (req, res) => {
  try {
    // Verificar si el usuario está autenticado

    
    // El usuario está autenticado, obtener su ID
    const iduser = req.user ? req.user.id : null;

    // Obtener las imágenes del usuario autenticado
    const imagenes = await imagencontroll.mostrarTodos(iduser);
    
    // Renderizar la página con las imágenes
    res.render('img-carrousel', { imagenes });
  } catch (error) {
    console.error('Error al obtener imágenes del usuario:', error);
    res.status(500).send('Error al obtener imágenes del usuario');
  }
});

module.exports = router;
