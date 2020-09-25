const config = require('../config/config');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid'); // Generar id unicos
const actualizarImagen = require('../helpers/actualizar-imagen');

const uploadFile = (req, res) => {

    const { tipo, id } = req.params;
    const tipoValidos = ['usuarios', 'medicos', 'hospitales'];

    // Validar tipos
    if( !tipoValidos.includes(tipo) )
    {
        return res.status(400).json({
            ok: false,
            err: `El tipo ${tipo} no es valido. Los validos son: ${tipoValidos}`
        });
    }


    // Validar que existe un archivo
    if (!req.files || Object.keys(req.files).length === 0)
    {
        return res.status(400).json({
            ok: false,
            err: `No hay archivo existente`
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    
    const nombreCortado = file.name.split('.');
    const tamanoArchivo = file.size;
    const extensionArchivo = nombreCortado[nombreCortado.length - 1]; // Obtener la extension del archivo


    // Validar extension
    const extensionesValidas = ['jpeg', 'jpg', 'png', 'gif'];
    if( !extensionesValidas.includes(extensionArchivo) )
    {
        return res.status(400).json({
            ok: false,
            err: `La extension ${extensionArchivo} no es valido. Los validos son: ${extensionesValidas}`
        });
    }

    // Valitar tamaño de archivo max 50MB
    if(tamanoArchivo > config.max_size_file)
    {
        return res.status(400).json({
            ok: false,
            message: `Tamaño maximo permitido para subir es ${ config.max_size_file / 1024 / 1024 } MB`,
            sizeToUpload: `${ tamanoArchivo / 1024 / 1024 } MB`
        });
    }

    // Generar el nombre unico del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;
    const pathSaveFile = `./server/upload/${ tipo }/${ nombreArchivo }`;
    
    // Use the mv() method to place the file somewhere on your server
    file.mv( pathSaveFile, (err) => {
    if (err)
    {
        return res.status(500).json({
            ok: false,
            err: `Error al subir el archivo`,
            error: err
        });
    }

    // Actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo);

    res.status(200).json({
        ok: true,
        msg: 'Imagen subida!!!'
    });

  });
}

const retornaImagen = (req, res) => {
    const {tipo, foto} = req.params;
    const pathImg = path.join(__dirname, `../upload/${ tipo }/${ foto }`);
    
    // imagen por defecto
    if( !fs.existsSync(pathImg) )
    {
        const noImg = path.join(__dirname, `../upload/no-img.jpg`);
        res.sendFile(noImg);
    }
    else
    {
        res.sendFile( pathImg );
    }
}

module.exports = {
    uploadFile,
    retornaImagen
}