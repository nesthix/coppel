/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
  attributes: {
    // crear los siguientes atributos "nombre": "string",  "correo": "string",	"constraseña": "string"
    nombre: {
      type: 'string',
      required: true,
      regex: /^[a-zA-Z0-9]+$/
    },
    correo: {
      type: 'string',
      required: true
    },
    contraseña: {
      type: 'string',
      required: true
    },
    //--------------------------------------------------------------------------

  },

};

