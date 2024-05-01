// esta sera la plantilla del servidor 

// importar express y crear el servidor vamos a importar como si fueran modulos
const express = require('express');
const app = express();
const path = require( 'path' );
// permitir que los archivos estaticos se puedan cargar en nuestro proyecto
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para procesar archivos estáticos en la carpeta 'public'
app.get('/', (req, res) => {
  res.render('index');
});


app.use(express.static('public'));
app.use(express.json());
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });