// Path: '/api/medicos'

const { Router }        = require('express');
const { check } = require('express-validator');
const { getMedicos, getMedico, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos-controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


/*
Separar las rutas de la logica. Dicha logica se encuentra en los controllers
*/
router.get('/', validarJWT, getMedicos );
router.get('/:id', [ 
    validarJWT,
    check('id', 'Medico no valido').isMongoId(),
    validarCampos
], getMedico );


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