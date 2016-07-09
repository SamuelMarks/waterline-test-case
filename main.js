#!/usr/bin/env node
"use strict";
var Waterline = require('waterline');
var waterline_1 = require('waterline');
var waterline_postgres = require('waterline-postgresql');
var utils_1 = require('./utils');
var model_1 = require('./user/model');
var model_2 = require('./vame/model');
var db_uri = process.env.RDBMS_URI || process.env.DATABASE_URL || process.env.POSTGRES_URL;
exports.waterline_config = {
    adapters: {
        url: db_uri,
        postgres: waterline_postgres
    },
    defaults: {
        migrate: 'create',
    },
    connections: {
        postgres: Object.assign({
            adapter: 'postgres'
        }, utils_1.uri_to_config(db_uri))
    }
};
function main(models, callback) {
    var waterline = new Waterline();
    models.map(function (model) {
        return waterline.loadCollection(waterline_1.Collection.extend(model));
    });
    console.info('ORM initialised:', models.map(function (model) {
        return model['identity'];
    }));
    waterline.initialize(exports.waterline_config, function (err, ontology) {
        return err !== null ? callback(err) :
            callback(null, ontology.collections, ontology.connections);
    });
}
exports.main = main;
if (require.main === module) {
    main([model_1.User, model_2.Vame], function (err) {
        if (err)
            throw err;
        console.info('Run `npm test` to duplicate the bug');
    });
}
