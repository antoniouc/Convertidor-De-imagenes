const mysqlClient = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const conexionpool = mysqlClient.createPool({
    connectionLimit: 10,
    host : process.env.ACCESS_DB_HOST,
    user: process.env.ACCESS_DB_USER,
    password: process.env.ACCESS_DB_PASSWORD,
    database: process.env.ACCESS_DB_DATABASE,
    port: process.env.ACCESS_DB_PORT,
    waitForConnections: true,
    queueLimit: 0
})

function obtenerConexion() {
    return conexionpool.promise().getConnection()
}


module.exports = {obtenerConexion};