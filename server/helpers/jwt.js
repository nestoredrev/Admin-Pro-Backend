const jwt = require('jsonwebtoken');
const config = require('../config/config')

const generarJWT = (uid) => {

    return new Promise( (resolve, reject) => {
        const payload = {
            uid
        }
    
        jwt.sign(payload, config.seed, {
            expiresIn: config.expiracion_token
        }, (err, token) => {
            if(err)
            {
                reject(`Error al generar el token: ${err}`);
            }
            else
            {
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}