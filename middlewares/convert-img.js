const sharp = require('sharp');
const imagencontroll = require('../controller/imagenController');

const fs = require("fs");
const path = require("path");

async function convertirImagen(imagen, rutaSalida, formato, res, req) {
  sharp(imagen.path)
    .metadata()
    .then(metadata => {
      const widthimg = metadata.width;
      const heightimg = metadata.height;
      console.log(`${widthimg}, ${heightimg}`);

      // Utiliza los metadatos para redimensionar la imagen
      sharp(imagen.path)
        .resize({ width: widthimg, height: heightimg })
        .toFormat(formato)
        .toFile(rutaSalida, (err, info) => {
          if (err) {
            console.error('Error al convertir la imagen:', err);
            return res.status(500).send('Error al convertir la imagen');
          }

          // Guarda los detalles de la conversión en la base de datos
   // Leer los datos binarios de la imagen original y convertirlos a base64
   const imagenOriginalData = fs.readFileSync(imagen.path);
   const imagenOriginalBase64 = `data:${imagen.mimetype};base64,${imagenOriginalData.toString('base64')}`;
   
   // Leer los datos binarios de la imagen convertida y convertirlos a base64
   const imagenConvertidaData = fs.readFileSync(rutaSalida);
   const imagenConvertidaBase64 = `data:image/${formato};base64,${imagenConvertidaData.toString('base64')}`;

   // Guardar los detalles de la conversión en la base de datos
   const usuarioId = req.user ? req.user.id : null;  // Nombre de usuario autenticado
   const imagenOriginalNombre = imagen.originalname;
   const mimetypeOriginal = imagen.mimetype;
   const imagenConvertidaNombre = path.basename(rutaSalida);
   const formatoOriginal = formato; // Obtiene la extensión del archivo original
    guardarDetallesConversion(usuarioId, imagenOriginalBase64, 
      mimetypeOriginal, imagenConvertidaBase64, formatoOriginal);
   
          // Envía la imagen convertida como respuesta para que el usuario la descargue
          res.download(rutaSalida, (err) => {
            // Elimina la imagen temporal después de descargarla
            fs.unlink(imagen.path, (err1) => {
                if (err1) console.error('Error al eliminar la imagen temporal:', err1);
            });
            // Elimina la imagen convertida después de descargarla
            fs.unlink(rutaSalida, (err2) => {
                if (err2) console.error('Error al eliminar la imagen convertida:', err2);
            });
        });
  
        
        });


    })
    .catch(err => {
   
      console.error('Error al obtener metadatos de la imagen:', err);
      res.status(500).send('Error al obtener metadatos de la imagen');
    });
      
};

// Función para guardar los detalles de la conversión de imagen en la base de datos
async function guardarDetallesConversion(usuario, imagenOriginal, mimetypeOriginal, imagenConvertida, formatoOriginal, formatoConvertido) {
  try {

    await imagencontroll.registrarImagen(usuario, imagenOriginal, mimetypeOriginal, imagenConvertida, formatoOriginal, formatoConvertido)
  } catch (error) {
    console.error('Error al guardar los detalles de la conversión de imagen en la base de datos:', error);
    throw error; // Propaga el error para que sea manejado por el controlador
  }
}
module.exports = convertirImagen;