//routes/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authenticateUser.js'); // Middleware para proteger rutas


// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login', { title: 'Iniciar sesión' });
});


router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), async (req, res) => {
  // Si se autentica correctamente, crea un token JWT
  const token = authMiddleware.generateToken(req.user.id);

  res.cookie('token', token, { httpOnly: true, secure: false });

  res.redirect('/ver-imagenes');
});

module.exports = router;