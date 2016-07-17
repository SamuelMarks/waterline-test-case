"use strict";
var async = require('async');
var shared_tests_1 = require('../shared_tests');
var main_1 = require('../../main');
var user_api_1 = require('./user_api');
var model_1 = require('../../user/model');
var user_mock = {email: 'foo@bar.com'};
describe('User::model', function () {
    var collections, connections;
    before(function (done) {
        return main_1.main([model_1.User], function (err, _collections, _connections) {
            if (err)
                return done(err);
            collections = _collections;
            connections = _connections;
            return done();
        });
    });
    after(function (done) {
        return shared_tests_1.tearDownConnections(connections, done);
    });
    beforeEach(function (done) {
        return user_api_1.destroy(collections, user_mock, done);
    });
    afterEach(function (done) {
        return user_api_1.destroy(collections, user_mock, done);
    });
    describe('create user', function () {
        it('should create user', function (done) {
            async.series([
                function (cb) {
                    return user_api_1.create(collections, user_mock, cb);
                },
                function (cb) {
                    return user_api_1.retrieve(collections, user_mock, cb);
                }
            ], done);
        });
    });
});
