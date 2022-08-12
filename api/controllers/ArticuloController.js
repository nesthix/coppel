/**
 * ArticuloController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
    const jwt = require('jsonwebtoken');
module.exports = {
  //El controlador de articulo se encarga del CRUD de los articulos
    //metodo para crear articulos
    create: async function (req, res) {
        try {
            //se obtienen los datos del articulo
            let articulo = req.body;
            console.log(articulo);
            //obtener el id de usuario del jwt y agregarlo al articulo idUsuario
            let decoded = jwt.verify(req.headers.authorization, sails.config.custom.secret);
            articulo.idUsuario = decoded.id;
            //se verifica que la imagen del producto este definida para iniciar la carga y que no sobrepase los 16 mb
            let imagen  = await readUploadedFileASync(req, 'imagen');
            articulo.imagen = imagen[0].fd;
            //se crea el articulo
            await Articulo.create(articulo).fetch();
            //se retorna el articulo creado
            return res.status(201).send({
                success: true,
                message: 'Articulo creado exitosamente'
            });
        }
        catch (error) {
            return res.status(200).send({
                success: false,
                message: `${error.message}`
            });
        }
    },
    //metodo para obtener articulos si no se pasa el id de articulo se obtienen todos los articulos method Get
    read: async function (req, res) {
        try {
            //se obtiene el id del articulo
            let id = req.param('id');
            //se verifica si el id del articulo existe
            if(typeof id !== 'undefined'){
                let articuloExist = await Articulo.findOne({ id: id });
                if (!articuloExist) {
                    throw new Error('El id del articulo no existe');
                }
                //se retorna el articulo
                return res.status(200).send({
                    success: true,
                    message: 'Articulo encontrado exitosamente',
                    articulo: articuloExist
                });
            }else{
                //se obtienen todos los articulos
                let articulos = await Articulo.find();
                return res.status(200).send({
                    success: true,
                    articulos: articulos
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
    //metodo para actualizar un articulo method Put
    update: async function (req, res) {
        try {
            //se obtiene el id del articulo
            let id = req.param('id');
            //se verifica si el id del articulo existe
            let decoded = jwt.verify(req.headers.authorization, sails.config.custom.secret);
            let articuloExist = await Articulo.findOne({ id: id, idUsuario: decoded.id });
            if (!articuloExist) {
                throw new Error('El id del articulo no existe');
            }
            //se obtienen los datos del articulo
            let articulo = req.body;
            //se actualiza el articulo
            await Articulo.update({ id: id }).set(articulo);
            //se retorna el articulo actualizado
            return res.status(200).send({
                success: true,
                message: 'Articulo actualizado exitosamente'
            });
        }
        catch (error) {
            return res.status(404).send({
                success: false,
                message: `${error.message}`
            });
        }
    },
    //metodo para eliminar un articulo method Delete
    delete: async function (req, res) {
        try {
            //se obtiene el id del articulo
            let id = req.param('id');
            //se verifica si el id del articulo existe
            let decoded = jwt.verify(req.headers.authorization, sails.config.custom.secret);
            let articuloExist = await Articulo.findOne({ id: id, idUsuario: decoded.id });
            if (!articuloExist) {
                throw new Error('El id del articulo no existe');
            }
            //se elimina el articulo
            await Articulo.destroy({ id: id });
            //se retorna 204 no content
            return res.status(204).send();
        }
        catch (error) {
            return res.status(404).send({
                success: false,
                message: `${error.message}`
            });
        }
    }
};
//metodo para cargar imagenes en s3 asíncrono usando skipper-gridfs
let readUploadedFileASync = function(req, name) {
    return new Promise(function(resolve, reject) {
        req.file(name).upload({
            adapter: require('skipper-s3'),
            key: sails.config.custom.s3AccessKey,
            secret: sails.config.custom.s3SecretAccessKey,
            bucket: sails.config.custom.s3Bucket,
        }, function(error, files) {
            return error ? reject(error) : resolve(files);
        });
    });
};

