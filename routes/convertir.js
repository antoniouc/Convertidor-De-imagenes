const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const convertirImagen = require('../middlewares/convert-img');
const contador = require('../middlewares/contador');

// Configura Multer para guardar archivos en public/imagenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imagenes/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });

// Ruta POST para la conversión de imágenes
router.post('/', upload.single('imagen'), contador, async (req, res) => {
  const imagen = req.file; // Archivo de imagen enviado desde el formulario
  const formato = req.body.formato; // Formato de salida seleccionado

  // Ruta de salida para la imagen convertida

  const rutaSalida = `public/imagenes/imagen_convertida.${formato}`;
  // Usa Sharp para convertir la imagen
  await convertirImagen(imagen,rutaSalida,formato, res, req);

  req.session.conversionCount++;
  req.body.file = '';
  req.body.formato = '';

});

module.exports = router;
