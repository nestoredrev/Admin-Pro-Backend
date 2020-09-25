const fs = require('fs');

const Usuario  = require('../models/usuario-model');
const Medico   = require('../models/medico-model');
const Hospital = require('../models/hospital-model');



const actualizarImagen = async (tipo, id, nombreArchivo) => {
    
    let pathExistente = '';

    switch (tipo)
    {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario)
            {
                console.log('El usuario con el id no existe');
                return false;
            }

            pathExistente = `./server/upload/usuarios/${usuario.img}`;
            borrarImagen(pathExistente);


            // Se puede actualizar de la misma manera
            // const usuarioActualizado = await Usuario.findByIdAndUpdate(id, {img: nombreArchivo}, {new: true});
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;

        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico)
            {
                console.log('El medico con el id no existe');
                return false;
            }

            pathExistente = `./server/upload/medicos/${medico.img}`;
            borrarImagen(pathExistente);


            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if(!hospital)
            {
                console.log('El hospital con el id no existe');
                return false;
            }

            pathExistente = `./server/upload/hospitales/${hospital.img}`;
            borrarImagen(pathExistente);

            
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;
    
        default:
        break;
    }

}

const borrarImagen = (path) => {
    if( fs.existsSync(path) )
    {
        // borrar archivo si existe la imagen
        fs.unlinkSync(path);
    }
}

module.exports = actualizarImagen;