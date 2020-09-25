const Medico = require('../models/medico-model');




const getMedicos = async (req, res) => {
    
    try {
        const medicos =  await Medico.find({})
                                     .populate('hospital', 'nombre img')
                                     .populate('usuario', 'nombre img, role', {'nombre':'test 1'}) // populate: path, select, match
        res.status(200).json({
            ok: true,
            medicos
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Hable con el admin'
        });
    }
    

}

const crearMedico = async (req, res) => {
    
    const uid = req.uid;
    const { nombre, hospital } = req.body;

    const medico = new Medico({
        nombre,
        hospital,
        usuario: uid,
    }); 

    try {

        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medicoDB
        });
        
    } catch (error) {

        return res.status(500).json({
            ok: true,
            msg: 'Hable con el admin'
        });
        
    }
}

const actualizarMedico = (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Actualizar Medico'
    });
}

const borrarMedico = (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Borrar Medico'
    });
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}