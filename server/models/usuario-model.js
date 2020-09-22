const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        require: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
        default: 'USER_ROLE'

    },
    google: {
        type: Boolean,
        default: false
    }
});

// Configuracion global de schema 
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...object } = this.toObject(); // Extraer campos de vuelta
    object.uid = _id; // Modificar cambos de vuelta
    return object;
})

module.exports = model('Usuario', UsuarioSchema);