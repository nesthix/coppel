/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //ruta para usersController metodo register
  'POST /users/register': 'UsersController.register',
  //ruta para usersController metodo login
  'POST /users/login': 'UsersController.login',
  //rutas para el CRUD del controlador articulo
  'POST /articulo': 'ArticuloController.create',
  'GET /articulo/:id?': 'ArticuloController.read',
  'PUT /articulo/:id': 'ArticuloController.update',
  'DELETE /articulo/:id': 'ArticuloController.delete',
  //rutas para el CRUD del controlador pedido
  'POST /pedido': 'PedidoController.create',
  'GET /pedido/:id?': 'PedidoController.read',
  'PUT /pedido/:id': 'PedidoController.update',
  'DELETE /pedido/:id': 'PedidoController.delete',
  //ruta para obtener todos los pedidos clasificados por usuario
  'GET /pedido/readAll': 'PedidoController.readAll',
  'GET /temp-files/:filename': { action: 'download-temp-file', skipAssets: false },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
