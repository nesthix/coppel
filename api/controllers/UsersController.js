/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken');

module.exports = {
    //metodo para el registro de usuarios
    register: async function (req, res) {
        try {
            //se obtienen los datos del usuario
            let user = req.body;
            //se valida la información del usuario
            await Users.validate('nombre', user.nombre);
            await Users.validate('correo', user.correo);
            await Users.validate('contraseña', user.contraseña);
            user.nombre = user.nombre.toLowerCase();
            //se verifica que el nombre de usuario no exista verificar minúsculas y mayúsculas
            let userExist = await Users.findOne({ nombre: user.nombre });
            if (userExist) {
                throw new Error('El nombre de usuario ya existe');
            }
            //se crea el usuario
            await Users.create(user).fetch();
            //se retorna el usuario creado
            return res.status(201).send({
                success: true,
                message: 'Usuario creado exitosamente'
            });
        }
        catch (error) {
            return res.status(200).send({
                success: false,
                message: `${error.message}`
            });
        }
    },
    //metodo para el login de usuarios
    login: async function (req, res) {
        try {
            //se obtienen los datos del usuario
            let user = req.body;
            //se valida la información del usuario
            await Users.validate('nombre', user.nombre);
            await Users.validate('contraseña', user.contraseña);
            user.nombre = user.nombre.toLowerCase();
            //se verifica que el nombre de usuario no exista verificar minúsculas y mayúsculas
            let userExist = await Users.findOne({ nombre: user.nombre });
            if (!userExist) {
                throw new Error('El nombre de usuario no existe');
            }
            //se verifica que la contraseña sea correcta
            if (userExist.contraseña !== user.contraseña) {
                throw new Error('La contraseña es incorrecta');
            }
            //crear el token de acceso con el id del usuario, el nombre de usuario y el correo
            let token = jwt.sign({
                id: userExist.id,
                nombre: userExist.nombre,
                correo: userExist.correo
            }, sails.config.custom.secret, {
                expiresIn: sails.config.custom.jwtExpiresIn
            });
            //se retorna el token de acceso
            return res.status(200).send({
                success: true,
                message: 'Login exitoso',
                token: token
            });
        }
        catch (error) {
            return res.status(200).send({
                success: false,
                message: `${error.message}`
            });
        }
    }
};

