const imagendb = require('../database/tables/dbimagenes');

class Imagenes {
    constructor(usuario_id, imagen_original, formatoOriginal, imagen_convertida, formatoConvertido) {
        this.usuario_id = usuario_id;
        this.imagen_original = imagen_original;
        this.formatoOriginal = formatoOriginal;
        this.imagen_convertida = imagen_convertida;
        this.formatoConvertido = formatoConvertido;
    }
}

async function registroImagen(usuario, imagenorig, formatoOrig, imagenConvert, formatoConvert){
    try{
        imagendb.insertarImagen(usuario, imagenorig, formatoOrig, imagenConvert, formatoConvert); 
    } catch  (error) {
        console.log("Error al intentar registrar el usuario: "+ error);  
    }   
};

async function obtenerTodos(iduser) {
    try {
      const imagene = await imagendb.obtenerTodos(iduser);
      return imagene.map(imagen => new Imagenes(imagen.usuario_id, imagen.imagen_original, imagen.formatoOriginal,
        imagen.imagen_convertida, imagen.FormatoConvertido
      ));
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  }
  

module.exports = {
    registroImagen,
    obtenerTodos,
};
