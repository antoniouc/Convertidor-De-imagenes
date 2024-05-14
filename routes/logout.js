const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    req.logout((err) => { // Pasar una función de devolución de llamada al método req.logout()
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return next(err);
        }
        req.session.destroy((err) => { // Destruir la sesión
            if (err) {
                console.error('Error al destruir la sesión:', err);
                return next(err);
            }
            console.log('Sesión destruida correctamente');
            res.clearCookie('token'); // Limpiar la cookie de sesión
            res.redirect('/'); // Redirigir a la página principal u otra página de tu elección
        });
    });
});

module.exports = router;
