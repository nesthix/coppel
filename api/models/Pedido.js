/**
 * Pedido.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //{ el modelo contiene los siguientes atributos "idUsuario": "number"
    //"idArticulo": "number"
	  //"direccion": "string",
    //"latitud": "number",
	  //"longitud": "number"
    //}
    idUsuario: {
      type: 'string',
      required: true
    },
    idArticulo: {
      type: 'string',
      required: true
    },
    direccion: {
      type: 'string',
      required: true
    },
    latitud: {
      type: 'number',
      required: true
    },
    longitud: {
      type: 'number',
      required: true
    },
  },

};

