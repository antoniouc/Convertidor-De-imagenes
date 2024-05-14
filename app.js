// esta sera la plantilla del servidor 

const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const router = require('./routes/routes');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usuarioController = require('./controller/userController'); // Archivo donde configuras tu base de datos SQLite
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authMiddleWare = require('./middlewares/authenticateUser')


app.use(cookieParser());

//Configura DotEnv
dotenv.config();

// Configurar middleware para manejar sesiones
app.use(session({
  secret: process.env.ACCESS_TOKEN_SECRET, // Clave secreta para firmar la cookie de sesión
  resave: false,
  saveUninitialized: false
}));

// Configura connect-flash
app.use(flash());

// Configurar Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configurar estrategia de autenticación local
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await usuarioController.obtenerUsuarioPorNombre(username);
      
      if (!user) {
        return done(null, false, { message: 'Usuario incorrecto.' });
      }
       const passwordMatch = await authMiddleWare.comparePassword( password, user.contrasena);
      if (!passwordMatch) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  await usuarioController.obtenerUsuarioPorId(id).then((user) => {
    done(null, user);
  }).catch((error) => {
    done(error, null);
  });
});

// Middleware para pasar el usuario autenticado a todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.user || ''; // Pasa el usuario autenticado a todas las vistas
  next();
});




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

app.use(express.urlencoded({ extended: true }));

// Configuración de la plantilla Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use(express.static('public'));
app.use(express.json());

app.use('/', router);

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.use('/splide', express.static(__dirname + '/node_modules/@splidejs/splide/dist'));

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });