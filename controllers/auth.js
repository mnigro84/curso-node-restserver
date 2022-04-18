
const bcryptjs = require('bcryptjs');
const { response } = require('express');
const generarJWT = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login = async(req,res = response) => {

    const {correo, password} = req.body;

    try {

        const usuario = await Usuario.findOne({correo});
        //Verificar si el correo existe
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //verificar que el usuario este activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //Verificar la contraeña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);
        
        res.json({
           usuario,
           token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal'
        })
    }

}

module.exports = login;