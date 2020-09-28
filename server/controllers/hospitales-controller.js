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

const actualizarHospital = async (req, res) => {
    
    const hospitalId = req.params.id;
    const uid        = req.uid;
    
    const cambiosHospital = {
        ...req.body,
        usuario: uid
    }

    try {

        const hospitalDB = await Hospital.findById(hospitalId);
    
        if(!hospitalDB)
        {
            return res.status(404).json({
                ok: false,
                err: `No existe Hospital con el id: ${hospitalId}`
            });
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, {new: true});

        res.status(200).json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}

const borrarHospital = async (req, res) => {
    
    const hospitalId = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(hospitalId);
    
        if(!hospitalDB)
        {
            return res.status(404).json({
                ok: false,
                err: `No existe Hospital con el id: ${hospitalId}`
            });
        }

        await Hospital.findByIdAndDelete(hospitalId);

        res.status(200).json({
            ok: true,
            msg: `El hospital ${hospitalDB.nombre} fue eliminado`
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }   
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}