const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    
    const errores = validationResult( req );
    if(!errores.isEmpty())
    {
        return res.status(400).json({
            ok: false,
            error: errores.mapped()
        });   
    }
    next(); // Si todo a ido bien ejecuta el controlador en usuarios-routes
}

module.exports = {
    validarCampos
}