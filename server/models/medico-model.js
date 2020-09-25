const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Hospital'
    }
});

// Configuracion global de schema 
MedicoSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject(); // Extraer campos de vuelta
    object.id = _id; // Modificar cambos de vuelta
    return object;
})

module.exports = model('Medico', MedicoSchema);