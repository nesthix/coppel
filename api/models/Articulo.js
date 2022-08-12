/**
 * Articulo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  
  attributes: {

    //atributos del modelo "idUsuario": "number",	"nombre": "string",  "imagen": "string",	"precio": "number",  "descripcion": "string"
    idUsuario: {
      type: 'string',
      required: true
    },
    nombre: {
      type: 'string',
      required: true
    },
    imagen: {
      type: 'string',
      required: true
    },
    precio: {
      type: 'number',
      required: true
    },
    descripcion: {
      type: 'string',
      required: true
    },
    //--------------------------------------------------------------------------

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

