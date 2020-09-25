const Hospital = require('../models/hospital-model');

const getHospitales = (req, res) => {
    
    // populate extrae informacion relacionada con la coleccion en este caso el usuario
    Hospital.find({}).populate('usuario', 'nombre img').exec((err, hospitales) => {
        if(err)
        {
            return res.status(500).json({
                ok: true,
                err
            });
        }

        res.status(200).json({
            ok: true,
            hospitales
        });

    });
}

const  crearHospital = async (req, res) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    }); 


    try {

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospitalDB
        });
        
    } catch (error) {

        return res.status(500).json({
            ok: true,
            msg: 'Hable con el admin'
        });
        
    }


}

const actualizarHospital = (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Actualizar hospital'
    });
}

const borrarHospital = (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Borrar hospital'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}