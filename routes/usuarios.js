
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete } = require('../controllers/usuarios');

        const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole 
} = require('../middlewares');

const { cacheInit } = require('../middlewares/cache');

const router = Router();

router.get('/', 
cacheInit,
usuariosGet);

router.get('/:id',
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
    cacheInit,
usuariosGet);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos,
], usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe estar compuesto por mas de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost);

router.delete('/:id',
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos,
usuariosDelete);

3
module.exports = router;