"use strict";
var _this = this;
var async = require('async');
var shared_tests_1 = require('../shared_tests');
var main_1 = require('../../main');
var user_api_1 = require('./user_api');
var model_1 = require('../../user/model');
var user_mock = {email: 'foo@bar.com'};
describe('User::model', function () {
    before(function (done) {
        return main_1.main([model_1.User], function (err, collections, connections) {
            if (err)
                return done(err);
            _this.collections = collections;
            _this.connections = connections;
            return done();
        });
    });
    after(function (done) {
        return shared_tests_1.tearDownConnections(_this.connections, done);
    });
    beforeEach(function (done) {
        return user_api_1.destroy(_this.collections, user_mock, done);
    });
    afterEach(function (done) {
        return user_api_1.destroy(_this.collections, user_mock, done);
    });
    describe('create user', function () {
        it('should create user', function (done) {
            async.series([
                function (cb) {
                    return user_api_1.create(_this.collections, user_mock, cb);
                },
                function (cb) {
                    return user_api_1.retrieve(_this.collections, user_mock, cb);
                }
            ], done);
        });
    });
});
