const Usuario = require('../models/usuario-model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async (req, res) => {
    
    const desde = Number(req.query.desde) || 0;

    //Ejecutar las promesas una detras de la otra. Y si la query tarda mucho ese puede relentizar el proceso
    // const usuarios =  await Usuario.find({}, 'nombre email role google') // Espera que la promesa termine para seguir ejecutando el codigo
    //                                .skip( desde )
    //                                .limit ( 5 )


    // const totalRegistros = await Usuario.count();

    // Ejecuta todas estas promesas a la vez (de manera simultanea). Esta manera es mas eficiente
    const [ usuarios, totalRegistros ] = await Promise.all([
            Usuario.find({}, 'nombre email role google, img') // Espera que la promesa termine para seguir ejecutando el codigo
                         .skip( desde )
                         .limit ( 5 ),
            Usuario.countDocuments()
    ]);
                                   
    res.status(200).json({
        ok: true,
        usuarios,
        totalRegistros
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
            // De esta manera tambien eliminamos los campos google y password del objeto data
            const {google, password, ...data} = req.body;

            // Eliminar campos que nos vienen en el post  
            // delete data.google;

            if ( usuarioDB.email !== data.email )
            {
                // Solo actualizar el email si el usuario no ha entrado con Google
                if(!usuarioDB.google)
                {
                    const existeEmail = await Usuario.findOne({ email: data.email });
                    if(existeEmail)
                    {
                        return res.status(400).json({
                            ok: false,
                            msg: `El email ${data.email} ya esta en uso`
                        });
                    }
                }
                else
                {
                    return res.status(400).json({
                        ok: false,
                        msg: `Los usuario de Google no pueden cambiar su correo`
                    });
                }
            }

            // Encriptar contraseña
            const salt = bcryptjs.genSaltSync();
            usuarioDB.password = bcryptjs.hashSync( password, salt );
            await usuarioDB.save();

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
            //db.getCollection('usuarios').deleteMany({nombre: /bai/})
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