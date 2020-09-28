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



const actualizarMedico = async (req, res) => {

    const medicoId = req.params.id;
    const uid        = req.uid;
    
    const cambiosMedico = {
        ...req.body,
        usuario: uid
    }

    try {

        const medicoDB = await Medico.findById(medicoId);
    
        if(!medicoDB)
        {
            return res.status(404).json({
                ok: false,
                err: `No existe Medico con el id: ${medicoId}`
            });
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico, {new: true});

        res.status(200).json({
            ok: true,
            medico: medicoActualizado
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }
}



const borrarMedico = async (req, res) => {

    const medicoId = req.params.id;

    try {

        const medicoDB = await Medico.findById(medicoId);
    
        if(!medicoDB)
        {
            return res.status(404).json({
                ok: false,
                err: `No existe Medico con el id: ${medicoId}`
            });
        }

        await Medico.findByIdAndDelete(medicoId);

        res.status(200).json({
            ok: true,
            msg: `El medico ${medicoDB.nombre} fue eliminado`
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }   
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}