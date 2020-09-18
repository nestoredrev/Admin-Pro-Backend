const config    = require('./config/config');
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const app = express();

// CORS es necesario para que el servidor acepte peticiones de diferentes dominios
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg:'Todo ha ido bien'
    })
});


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


