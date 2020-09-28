// Path: '/api/login'


const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle, renewToken } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'Contraseña obligatorio').not().isEmpty(),
    validarCampos
], login);


router.post('/google', [
    check('token', 'Token es obligatorio').not().isEmpty(),
    validarCampos
], loginGoogle);

// Refrescar token
router.get('/renew', validarJWT, renewToken);

module.exports = router;