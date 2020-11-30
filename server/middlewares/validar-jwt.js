const jwt = require('jsonwebtoken');
const config = require('../config/config');
const Usuario = require('../models/usuario-model');


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


const validarADMIN_ROLE = async (req, res, next) => {
    
    const uid = req.uid;
    
    try {
        const usarioDB = await Usuario.findById(uid);
        if(!usarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            })
        }

        if(usarioDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'El usuario no tiene permisos'
            })
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    validarJWT,
    validarADMIN_ROLE
}