const { Router }        = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuario, actualizarPerfilUsuario, actualizarUsuario, borrarUsuario }   = require('../controllers/usuarios-controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt');

const router = Router();


/*
Separar las rutas de la logica. Dicha logica se encuentra en los controllers
*/
router.get('/', validarJWT, getUsuarios );


router.post('/', [
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('password', 'Contraseña obligatoria').not().isEmpty(),
    check('email', 'Email obligatorio').not().isEmpty().isEmail(),
    validarCampos
], crearUsuario );


router.put('/perfil/:id', [
    validarJWT,
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('email', 'Email obligatorio').not().isEmpty().isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], actualizarPerfilUsuario);

router.put('/:id', [
    validarJWT,
    validarADMIN_ROLE,
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('email', 'Email obligatorio').not().isEmpty().isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario);


router.delete('/:id', [validarJWT, validarADMIN_ROLE], borrarUsuario);



module.exports = router;