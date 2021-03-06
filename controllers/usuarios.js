const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');



const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}
    const id = req.params.id;

    if (id) {
        const usuario = await Usuario.findById(id);
        return res.json({
            usuario
        });
    }
    
  
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {
    
    const {nombre, correo, password, rol} = req.body;

    const usuario = new Usuario({nombre, correo, password, rol});

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guarda en BD
    await usuario.save();

    res.json({
        msg: 'post Api - controlador',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const id = req.params.id;
    const {_id, password, google, ...resto} = req.body;

    // TODO validar contra BD
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    const estado = {estado:false};
    const usuario = await Usuario.findByIdAndUpdate(id, estado);

    res.json({usuario});
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}