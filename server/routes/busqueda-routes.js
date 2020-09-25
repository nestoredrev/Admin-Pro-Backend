const { Router } = require('express');
const { getTodo, busquedaPorCollection  } = require('../controllers/busqueda-controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/:busqueda', validarJWT, getTodo);

router.get('/collection/:tabla/:busqueda', validarJWT, busquedaPorCollection);


module.exports = router;