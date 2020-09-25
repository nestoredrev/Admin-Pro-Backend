
 const Usuario   = require('../models/usuario-model');
 const  Medico   = require('../models/medico-model');
 const Hospital  = require('../models/hospital-model');


const getTodo = async (req , res) => {
    
    
    // localhost:3000/api/todo/nestor
    const textBuscar = req.params.busqueda;
    
    // key sensitivy
    const regex = new RegExp (textBuscar, 'i');


    // const usuarios   = await Usuario.find({nombre: regex});
    // const medicos    = await Medico.find({nombre: regex});
    // const hospitales = await Hospital.find({nombre: regex});


    const [ usuarios, medicos, hospitales ] = await Promise.all([
            Usuario.find({nombre: regex}),
            Medico.find({nombre: regex}),
            Hospital.find({nombre: regex})
    ]);

    res.status(200).json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })
}


const busquedaPorCollection = async (req , res) => {
    
    const textBuscar = req.params.busqueda;
    const tabla = req.params.tabla;
    let data = [];
    
    // key sensitivy
    const regex = new RegExp (textBuscar, 'i');

    switch ( tabla ) {
        case 'usuarios':
            data = await Usuario.find({nombre: regex});
        break;

        case 'medicos':
            data = await Medico.find({nombre: regex})
                               .populate('usuario', 'nombre img')
                               .populate('hospital', 'nombre img')
        break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                 .populate('usuario', 'nombre img')
        break;
    
        default:
            res.status(400).json({
                ok: false,
                msg: 'Error: Tabla incorrecta. Las tablas son usuarios, medicos y hospitales'
            });
        break;
    }

    res.status(200).json({
        ok:true,
        resultados: data
    });
}


module.exports = {
    getTodo,
    busquedaPorCollection
}