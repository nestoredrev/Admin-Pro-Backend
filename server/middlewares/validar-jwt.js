const jwt = require('jsonwebtoken');
const config = require('../config/config');


const validarJWT = (req, res, next) => {

    // Leer el token
    const token = req.header('x-token');

    if(!token)
    {
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify(token, config.seed);
        req.uid = uid; // Devolver el uid en el request del controlador donde se llama el middleware
        next();
        
    } catch (error) {
        return res.status(400).json({
            ok:false,
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}