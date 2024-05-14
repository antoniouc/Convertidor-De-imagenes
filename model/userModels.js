const UsuarioDB = require('../database/tables/dbusuarios');

class Usuarios{
    constructor(id, nombre, email, contrasena){
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;

    }
}

async function registrarUsuario(nombre,email,password){
    try{
        UsuarioDB.registrarUsuario(nombre,email,password);
        console.log("usuario registrado con exito"); 
    } catch  (error) {
        console.log("Error al intentar registrar el usuario: "+ error);  
    }   
}

async function obtenerUsuarioPorNombre(nombre) {
    try{
      const usuario = await UsuarioDB.obtenerPorNombre(nombre);
      if(usuario) {
        return  new Usuarios (usuario.id, usuario.nombre, usuario.email, usuario.contrasena);
      }
      return  null;
    }catch(error){
  
    }
  }

  async function obtenerUsuarioPorId(id) {
    try{
      const usuario = await UsuarioDB.obtenerPorId(id);
      if(usuario) {
        return  new Usuarios (usuario.id, usuario.nombre, usuario.email,usuario.password_hash, usuario.id_rol);
      }
      return  null;
    }catch(error){
  
    }
  }

  module.exports = {
    registrarUsuario,
    obtenerUsuarioPorNombre,
    obtenerUsuarioPorId
  };