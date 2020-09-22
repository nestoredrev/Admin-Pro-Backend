const bcryptjs       = require('bcryptjs');
const jwt            = require('jsonwebtoken');
const { response }   = require('express');
const Usuario        = require('../models/usuario-model');
const { generarJWT } = require('../helpers/jwt');

const login =  async (req, res = response) => {
    
    const { email, password } = req.body;
    
    try {

        const usuarioDB = await Usuario.findOne({email})

        // Verificar email
        if( !usuarioDB )
        {
            return res.status(400).json({
                ok: false,
                error: `Usuario o contraseña no son correctos 1`
            });
        }

        //Verificar contraseña
        const validarPassword = bcryptjs.compareSync( password, usuarioDB.password )
        if(!validarPassword)
        {
            return res.status(400).json({
                ok: false,
                error: `Usuario o contraseña no son correctos 2`
            });
        }

        // Generar Token
        const token =  await generarJWT(usuarioDB._id);
 
        res.status(200).json({
            ok: true,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        })
    }
    

}


module.exports = {
    login
}