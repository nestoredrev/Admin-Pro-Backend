const { Router } = require('express');
const { uploadFile, retornaImagen } = require('../controllers/upload-controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const fileUpload = require('express-fileupload');

const router = Router();

// default options
router.use(fileUpload());


router.post('/:tipo/:id', validarJWT,  uploadFile);
router.get('/:tipo/:foto',  retornaImagen);


module.exports = router;