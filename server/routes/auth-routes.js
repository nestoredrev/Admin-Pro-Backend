// Path: '/api/login'


const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/auth-controller');
const { validarCampos } = require('../middlewares/validar-campos');

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

module.exports = router;