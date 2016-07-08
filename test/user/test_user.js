"use strict";
var async = require('async');
var shared_tests_1 = require('../shared_tests');
var main_1 = require('../../main');
var user_api_1 = require('./user_api');
var model_1 = require('../../user/model');
var user_mock = {email: 'foo@bar.com'};
describe('User::model', function () {
    before(function (done) {
        return async.series([
            function (cb) {
                return shared_tests_1.tearDownConnections(main_1.c.connections, cb);
            },
            function (cb) {
                return main_1.main([model_1.User], function (err) {
                    return cb(err);
                });
            }
        ], done);
    });
    after(function (done) {
        return shared_tests_1.tearDownConnections(main_1.c.connections, done);
    });
    beforeEach(function (done) {
        return user_api_1.destroy(user_mock, done);
    });
    afterEach(function (done) {
        return user_api_1.destroy(user_mock, done);
    });
    describe('create user', function () {
        it('should create user', function (done) {
            async.series([
                function (cb) {
                    return user_api_1.create(user_mock, cb);
                },
                function (cb) {
                    return user_api_1.retrieve(user_mock, cb);
                }
            ], done);
        });
    });
});
