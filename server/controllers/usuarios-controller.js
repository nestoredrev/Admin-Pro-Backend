const Usuario = require('../models/usuario-model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async (req, res) => {
    
    const usuarios =  await Usuario.find({}, 'nombre email role google'); // Espera que la promesa termine para seguir ejecutando el codigo
    
    res.status(200).json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async (req, res) => {
    
    const {email, password, nombre } = req.body;

    const existeEmail =  await Usuario.findOne({ email });

    if(existeEmail)
    {
        return res.status(400).json({
            ok: false,
            error: `El email: ${ email } ya existe`
        });   
    }

    const usuario = new Usuario( req.body );
    
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    
    usuario.save( async (err, usuarioSaved) => {
        if(err)
        {
            res.status(500).json({
                ok: false,
                error: err
            });
        }
        else
        {
            const token =  await generarJWT(usuarioSaved._id);
            res.status(200).json({
                ok: true,
                usuario: usuarioSaved,
                token
            });
        }
    });
}

const actualizarUsuario = async (req, res) =>{
    const uid  = req.params.id;
    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB)
        {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con id: ${uid} no existe`
            });
        }
        else
        {
            // const data = req.body;
            
            // De esta manera tambien eliminamos los campos password y google
            const {password, google, ...data} = req.body;

            // Eliminar campos que nos vienen en el post 
            // delete data.password; 
            // delete data.google;

            const existeEmail = await Usuario.findOne({ email: data.email });
            if(existeEmail)
            {
                return res.status(400).json({
                    ok: false,
                    msg: `El email ${data.email} ya esta en uso`
                });
            }

            /*
                new true devuelve el usuario ya actualizado
                new false devuelve el usuario antes de la actualizacion
            */
            const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, data, {new: true});
            res.status(200).json({
                ok: true,
                usuarioActualizado
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}


const borrarUsuario =  async (req, res) => {

    const uid  = req.params.id;

    try {

        const usuarioDB = await Usuario.findById( uid );

        if(!usuarioDB)
        {
            return res.status(400).json({
                ok: false,
                msg: `Usuario con id: ${uid} no existe`
            });
        }
        else
        {
            const delitedUsuario = await Usuario.findByIdAndDelete(uid);
            res.status(200).json({
                ok: true,
                delitedUsuario
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}