"use strict";
var chai_1 = require('chai');
var utils_1 = require('../../utils');
function create(collections, user, cb) {
    var User = collections['user_tbl'];
    User.create(user).exec(function (err, created_user) {
        err = utils_1.fmtError(err);
        var created_user_json;
        try {
            chai_1.expect(err).to.be.null;
            created_user_json = created_user.toJSON();
            ['createdAt', 'updatedAt'].map(function (k) {
                return user[k] = created_user_json[k];
            });
            chai_1.expect(created_user_json).to.deep.equal(user);
        }
        catch (e) {
            err = e;
        }
        finally {
            cb(err, created_user_json);
        }
    });
}
exports.create = create;
function retrieve(collections, user, cb) {
    var User = collections['user_tbl'];
    User.findOne(user).exec(function (err, retrieved_user) {
        err = utils_1.fmtError(err);
        var retrieved_user_json;
        try {
            chai_1.expect(err).to.be.null;
            retrieved_user_json = retrieved_user.toJSON();
            ['createdAt', 'updatedAt'].map(function (k) {
                return user[k] = retrieved_user_json[k];
            });
            chai_1.expect(retrieved_user_json).to.deep.equal(user);
        }
        catch (e) {
            err = e;
        }
        finally {
            cb(err, retrieved_user_json);
        }
    });
}
exports.retrieve = retrieve;
function destroy(collections, user, cb) {
    var User = collections['user_tbl'];
    User.destroy(user).exec(function (err) {
        err = utils_1.fmtError(err);
        try {
            chai_1.expect(err).to.be.null;
        }
        catch (e) {
            err = e;
        }
        finally {
            cb(err);
        }
    });
}
exports.destroy = destroy;
