const express = require('express');
const router = express.Router();

const index = require('./index');
const convertir = require('./convertir');
const login = require('./login');
const carrousel = require('./ver-imagenes');
const registro = require('./registro')
const registrousuario = require('./registro-usuario');
const logout = require('./logout');

router.use('/', index);
router.use('/convertir', convertir);
router.use('/login', login);
router.use('/ver-imagenes', carrousel);
router.use('/registro', registro)
router.use('/registro-usuario', registrousuario);
router.use('/logout', logout);
module.exports = router; 