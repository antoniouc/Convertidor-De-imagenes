// authMiddleware.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

//Configura DotEnv
dotenv.config();

function authenticate(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login');
    }

    try {
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;
        req.role = decoded.role;

        next();
    } catch (err) {
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/login');
    }
}

function authenticateadmin(req, res, next) {
    // Verifica si hay un token en las cookies de la solicitud
    const token = req.cookies.token;

    // Si no hay token, redirige al usuario al login
    if (!token) {
        return res.redirect('/login-admin');
    }

    try {
        // Verifica el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Almacena el ID del usuario en la solicitud para su posterior uso
        req.userId = decoded.userId;
        next();
    } catch (err) {
        // Si hay un error en la verificación del token, redirige al usuario al login
        return res.redirect('/login-admin');
    }
}

// Función para generar un token JWT
function generateToken(userId,role) {
    console.log(userId);
    console.log(role);
    // Crea un token con el ID de usuario y una clave secreta
    return jwt.sign({ 
        userId,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

async function getHash(passwordString){
    const saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS);
    const password_hash = await bcrypt.hash(passwordString, saltRounds);
    return password_hash;
}

async function comparePassword(passwordString, bdHash){
    const compareHashes = await bcrypt.compare(passwordString, bdHash);
    return compareHashes;
}

 function authRole(rol) {
    return (req, res, next) => { 
      const token = req.cookies.token;
      if (!token) return res.status(401).send('Acceso denegado'); 
  
      try {
        const verificado = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (verificado.role !== rol)  return res.redirect('/login-admin'); 
        req.usuario = verificado;
        next(); 
      } catch (error) { 
        res.status(400).send('Token no valido'); 
      }
    };
  }

module.exports = {
    authenticate,
    generateToken,
    getHash,
    comparePassword,
    authRole,
    authenticateadmin
};