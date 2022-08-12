/**
 * PedidoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const jwt = require('jsonwebtoken');

module.exports = {
  //controlador para el CRUD de los pedidos
    create: async function (req, res) {
        try {
            //se obtienen los datos del pedido
            let pedido = req.body;
            //obtener el id de usuario del jwt y agregarlo al pedido idUsuario
            let decoded = jwt.verify(req.headers.authorization, sails.config.custom.secret);
            pedido.idUsuario = decoded.id;
            //se verifica que el id del articulo exista
            let articuloExist = await Articulo.findOne({ id: pedido.idArticulo });
            if (!articuloExist) {
                throw new Error('El id del articulo no existe');
            }
            //se crea el pedido
            await Pedido.create(pedido).fetch();
            //se retorna el pedido creado
            return res.status(201).send({
                success: true,
                message: 'Pedido creado exitosamente'
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
    //metodo para obtener pedidos si no se pasa el id de pedido se obtienen todos los pedidos method Get
    read: async function (req, res) {
        try {
            //se obtiene el id del pedido
            let id = req.param('id');
            //se verifica si el id del pedido existe
            if(typeof id !== 'undefined'){
                let pedidoExist = await Pedido.findOne({ id: id });
                if (!pedidoExist) {
                    throw new Error('El id del pedido no existe');
                }
                //se retorna el pedido
                return res.status(200).send({
                    success: true,
                    message: 'Pedido encontrado exitosamente',
                    pedido: pedidoExist
                });
            }else{
                //se obtienen todos los pedidos
                let pedidos = await Pedido.find();
                return res.status(200).send({
                    success: true,
                    pedidos: pedidos
                });
            }
        }
        catch (error) {
            return res.status(404).send({
                success: false,
                message: `${error.message}`
            });
        }
    },
    //metodo para actualizar un pedido method Put
    update: async function (req, res) {
        try {
            //se obtiene el id del pedido
            let id = req.param('id');
            //se verifica si el id del pedido existe
            let pedidoExist = await Pedido.findOne({ id: id });
            if (!pedidoExist) {
                throw new Error('El id del pedido no existe');
            }
            //se obtienen los datos del pedido
            let pedido = req.body;
            //se actualiza el pedido
            await Pedido.update({ id: id }, pedido);
            //se retorna el pedido actualizado
            return res.status(200).send({
                success: true,
                message: 'Pedido actualizado exitosamente'
            });
        }
        catch (error) {
            return res.status(404).send({
                success: false,
                message: `${error.message}`
            });
        }
    },
    //metodo para eliminar un pedido method Delete
    delete: async function (req, res) {
        try {
            //se obtiene el id del pedido
            let id = req.param('id');
            //se verifica si el id del pedido existe
            let pedidoExist = await Pedido.findOne({ id: id });
            if (!pedidoExist) {
                throw new Error('El id del pedido no existe');
            }
            //se elimina el pedido
            await Pedido.destroy({ id: id });
            //se retorna el pedido eliminado
            return res.status(200).send({
                success: true,
                message: 'Pedido eliminado exitosamente'
            });
        }
        catch (error) {
            return res.status(404).send({
                success: false,
                message: `${error.message}`
            });
        }
    },
    //obtener todos los pedidos de todos los usuarios agrupados por usuario
    readAll: async function (_req, res) {
        try {
            //se obtienen todos los pedidos
            let pedidos = await Pedido.find();
            //se obtienen los usuarios
            let usuarios = await Users.find();
            //se obtienen los pedidos de cada usuario
            let pedidosUsuarios = [];
            for (let usuario of usuarios) {
                let pedidosUsuario = [];
                for (let pedido of pedidos) {
                    if (pedido.idUsuario === usuario.id) {
                        pedidosUsuario.push(pedido);
                    }
                }
                pedidosUsuarios.push({
                    idUsuario: usuario.id,
                    pedidos: pedidosUsuario
                });
            }
            return res.status(200).send({
                success: true,
                pedidosUsuarios: pedidosUsuarios
            });
        }
        catch (error) {
            return res.status(404).send({
                success: false,
                message: `${error.message}`
            });
        }
    }
};

