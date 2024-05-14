const express = require('express');
const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;