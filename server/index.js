const config    = require('./config/config');
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');

const app = express();
const path = require('path');

// CORS es necesario para que el servidor acepte peticiones de diferentes dominios
app.use(cors());

// Lectura y parseo del body
app.use( express.json() );


// Acceso al directorio publico
app.use(express.static('public'));




app.use('/api/usuarios', require('./routes/usuarios-routes'));
app.use('/api/hospitales', require('./routes/hospitales-routes'));
app.use('/api/medicos', require('./routes/medicos-routes'));
app.use('/api/todo', require('./routes/busqueda-routes'));
app.use('/api/upload', require('./routes/upload-routes'));
app.use('/api/login', require('./routes/auth-routes'));

// Ruta por defecto si no encuentra ninguna ruta de las definidas para el tema de despligue
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

mongoose.connect(config.db,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
        useFindAndModify: false
    }, 
    (err, res) => {
if(err) throw `Ha ocorrido un error a la conexion de la BBDD ---> ${err}`;
else console.log(`Base de datos ${res.name} online`);
});


app.listen( config.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.port}`);
});


