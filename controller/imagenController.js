const imagenmodel = require('../model/imagenModel');

async function registrarImagen(usuario, imagenorig, formatoOrig, imagenConvert, formatoConvert){
    const imagen = await imagenmodel.registroImagen(usuario, imagenorig, formatoOrig, imagenConvert, formatoConvert);
    return  imagen;
}

async function mostrarTodos(iduser){
    const imagenes = await imagenmodel.obtenerTodos(iduser);
    return imagenes;
}
module.exports = { 
    registrarImagen,
    mostrarTodos
};