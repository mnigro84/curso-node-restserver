const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol='') =>{
    const existRol = await Role.findOne({rol});
    if(!existRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async(correo = '') => {
    const existEmail = await Usuario.findOne({correo});

    if (existEmail) {
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existUsuario = await Usuario.findById(id);

    if (!existUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}