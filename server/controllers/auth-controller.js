const bcryptjs       = require('bcryptjs');
const jwt            = require('jsonwebtoken');
const { response }   = require('express');
const Usuario        = require('../models/usuario-model');
const { generarJWT } = require('../helpers/jwt');
const { verifyGoogle } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

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
            token,
            menu: getMenuFrontEnd( usuarioDB.role )
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

const loginGoogle = async (req, res = response) => {

    const token = req.body.token;

    try {
        const {name, email, picture }  = await verifyGoogle(token);
        const usuarioDB = await Usuario.findOne({email});
        let usuario;
        
        if(!usuarioDB)
        {
            usuario = new Usuario({
                nombre: name,
                email,
                password: ':)',
                img: picture,
                google: true
            });
        }
        else
        {
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = ':)';
        }

        await usuario.save();

        // Generar Token
        const tokenGen =  await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            token: tokenGen,
            menu: getMenuFrontEnd( usuario.role )
        });
        
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto o no valido'
        });
    }
}

const renewToken = async (req, res) => {

    uid = req.uid; // uid viene del middleware validarJWT si el token es valido

    const renewToken =  await generarJWT(uid);

    const usuario = await Usuario.findById( uid );

    res.status(200).json({
        ok: true,
        token: renewToken,
        usuario,
        menu: getMenuFrontEnd( usuario.role )
    });

}


module.exports = {
    login,
    loginGoogle,
    renewToken
}