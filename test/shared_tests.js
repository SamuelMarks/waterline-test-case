"use strict";
var async = require('async');
var main_1 = require('../main');
function tearDownConnections(connections, cb) {
    return connections ? async.parallel(Object.keys(connections).map(function (connection) {
        return connections[connection]._adapter.teardown;
    }), cb) : cb();
}
exports.tearDownConnections = tearDownConnections;
function clearConnections(cb) {
    main_1.c.connections = null;
    return cb !== undefined ? cb() : null;
}
exports.clearConnections = clearConnections;
