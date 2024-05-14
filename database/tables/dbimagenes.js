const { obtenerConexion } = require("../dbConfig");

// Función para insertar un nuevo usuario en la base de datos MySQL
async function insertarImagen(usuario, imagenorig, formatoOrig, imagenConvert, formatoConvert) {
    const conexion = await obtenerConexion();
    try {
        await conexion.query(
            "INSERT INTO imagenes (usuario_id, imagen_original, formatoOriginal, imagen_convertida, formatoConvertido) VALUES (?, ?, ?, ?, ?)",
            [usuario, imagenorig, formatoOrig, imagenConvert, formatoConvert]
        );
        console.log("Imagen registrada correctamente");
    } catch (error) {
        console.error("Error al intetar insertar imagen:", error);
        throw error;
    } finally {
        conexion.release(); // Liberar la conexión al finalizar
    }
};

async function obtenerTodos(iduser) {
    const conexion = await obtenerConexion();
    try {
        const [results] = await conexion.query('SELECT * FROM imagenes where usuario_id = ?' ,[iduser]);
        return results;
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        throw error;
    } finally {
        conexion.release(); // Liberar la conexión al finalizar
    }
}


module.exports = {
    insertarImagen,
    obtenerTodos
};