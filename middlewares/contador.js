// Middleware para verificar el número de conversiones
function checkConversionLimit(req, res, next) {
    if (!req.session.conversionCount) {
        req.session.conversionCount = 0;
    }
    if (req.session.conversionCount < 3) {
        next(); // Permite la conversión si el límite no se ha alcanzado
    } else {
        res.redirect('/login'); // Redirige al usuario a la página de registro
    }
  };

  module.exports = checkConversionLimit;