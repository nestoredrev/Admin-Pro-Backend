// Path: '/api/medicos'

const { Router }        = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos-controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


/*
Separar las rutas de la logica. Dicha logica se encuentra en los controllers
*/
router.get('/', getMedicos );


router.post('/', [
    validarJWT,
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('hospital', 'Hospital no valido').isMongoId(),
    validarCampos
], crearMedico );


router.put('/:id', [
    validarJWT,
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('hospital', 'Hospital no valido').isMongoId(),
    validarCampos
], actualizarMedico);


router.delete('/:id', validarJWT, borrarMedico);



module.exports = router;