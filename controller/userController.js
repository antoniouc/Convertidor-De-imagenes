const usuarioModel = require('../model/userModels');

async function registrarUsuario(nombre,email,password){
    const usuario = await usuarioModel.registrarUsuario(nombre, email, password);
    return  usuario;
}

async function obtenerUsuarioPorNombre(nombre) {
    const user = await usuarioModel.obtenerUsuarioPorNombre(nombre);
    console.log(user);
    return  user;
}

async function obtenerUsuarioPorId(id) {
    const user = await usuarioModel.obtenerUsuarioPorId(id);
    return  user;
}


module.exports ={
    registrarUsuario,
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorId
};
