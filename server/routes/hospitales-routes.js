// Path: '/api/hospitales'

const { Router }        = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales-controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


/*
Separar las rutas de la logica. Dicha logica se encuentra en los controllers
*/
router.get('/', getHospitales );


router.post('/', [
    validarJWT,
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    validarCampos
], crearHospital );


router.put('/:id', [
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    validarCampos
], actualizarHospital);


router.delete('/:id', borrarHospital);



module.exports = router;