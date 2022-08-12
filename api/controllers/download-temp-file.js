const AWS = require('aws-sdk');
module.exports = {


    friendlyName: 'Download temp file',


    description: 'Download temp file file (returning a stream).',


    inputs: {
        filename: {
            required: true,
            type: 'string'
        }
    },


    exits: {

    },


    fn: async function(inputs) {
        try {
            const { filename } = inputs;
            //get document from bucket using s3 credentials
            const s3 = new AWS.S3({
                accessKeyId: sails.config.custom.s3AccessKey,
                secretAccessKey: sails.config.custom.s3SecretAccessKey
            });
            const params = {
                Bucket: sails.config.custom.s3Bucket,
                Key: filename
            };
            const data = await s3.getObject(params).promise();
            //servir documento para la descarga in action
            this.res.setHeader('Content-disposition', 'attachment; filename=' + filename);
            this.res.setHeader('Content-type', data.ContentType);
            this.res.setHeader('Content-Length', data.ContentLength);
            this.res.write(data.Body);
            this.res.end();
        } catch (error) {
            //error personalizado
            throw new Error('Error al descargar archivo');
        }

    }


};