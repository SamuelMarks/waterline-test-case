"use strict";
var async = require('async');
var shared_tests_1 = require('../shared_tests');
var main_1 = require('../../main');
var vame_api_1 = require('./vame_api');
var model_1 = require('../../vame/model');
var vame_mock = {vame: 'Ola'};
describe('Vame::model', function () {
    before(function (done) {
        return async.series([
            function (cb) {
                return shared_tests_1.tearDownConnections(main_1.c.connections, cb);
            },
            function (cb) {
                return main_1.main([model_1.Vame], function (err) {
                    return cb(err);
                });
            }
        ], done);
    });
    after(function (done) {
        return shared_tests_1.tearDownConnections(main_1.c.connections, done);
    });
    beforeEach(function (done) {
        return vame_api_1.destroy(vame_mock, done);
    });
    afterEach(function (done) {
        return vame_api_1.destroy(vame_mock, done);
    });
    describe('create vame', function () {
        it('should create vame', function (done) {
            async.series([
                function (cb) {
                    return vame_api_1.create(vame_mock, cb);
                },
                function (cb) {
                    return vame_api_1.retrieve(vame_mock, cb);
                }
            ], done);
        });
    });
});
