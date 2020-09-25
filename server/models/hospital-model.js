const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
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
    }
}, { collection: 'hospitales' }); // Cambiar el nombre de la Collection

// Configuracion global de schema 
HospitalSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject(); // Extraer campos de vuelta
    object.id = _id; // Modificar cambos de vuelta
    return object;
})

module.exports = model('Hospital', HospitalSchema);