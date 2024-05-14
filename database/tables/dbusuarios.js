const { obtenerConexion } = require('../dbConfig');

// Función para insertar un nuevo usuario en la base de datos MySQL
async function registrarUsuario(nombre, email, password) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', [nombre, email, password]);
        console.log('Usuario insertado correctamente');
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        throw error;
    } finally {
        conexion.release(); // Liberar la conexión al finalizar
    }
}

// Función para obtener un usuario por su nombre de usuario
async function obtenerPorNombre(nombre) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error);
        throw error;
    } finally {
        conexion.release(); // Liberar la conexión al finalizar
    }
}

// Función para obtener un usuario por su ID
async function obtenerPorId(id) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return results[0];
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error;
    } finally {
        conexion.release(); // Liberar la conexión al finalizar
    }
}

module.exports = {
    registrarUsuario,
    obtenerPorNombre,
    obtenerPorId
};