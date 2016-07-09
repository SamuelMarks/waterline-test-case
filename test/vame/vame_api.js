"use strict";
var chai_1 = require('chai');
var utils_1 = require('../../utils');
function create(collections, vame, cb) {
    var Vame = collections['vame_tbl'];
    Vame.create(vame).exec(function (err, created_vame) {
        err = utils_1.fmtError(err);
        var created_vame_json;
        try {
            chai_1.expect(err).to.be.null;
            created_vame_json = created_vame.toJSON();
            ['createdAt', 'updatedAt'].map(function (k) {
                return vame[k] = created_vame_json[k];
            });
            chai_1.expect(created_vame_json).to.deep.equal(vame);
        }
        catch (e) {
            err = e;
        }
        finally {
            cb(err, created_vame_json);
        }
    });
}
exports.create = create;
function retrieve(collections, vame, cb) {
    var Vame = collections['vame_tbl'];
    Vame.findOne(vame).exec(function (err, retrieved_vame) {
        err = utils_1.fmtError(err);
        var retrieved_vame_json;
        try {
            chai_1.expect(err).to.be.null;
            retrieved_vame_json = retrieved_vame.toJSON();
            ['createdAt', 'updatedAt'].map(function (k) {
                return vame[k] = retrieved_vame_json[k];
            });
            chai_1.expect(retrieved_vame_json).to.deep.equal(vame);
        }
        catch (e) {
            err = e;
        }
        finally {
            cb(err, retrieved_vame_json);
        }
    });
}
exports.retrieve = retrieve;
function destroy(collections, vame, cb) {
    var Vame = collections['vame_tbl'];
    Vame.destroy(vame).exec(function (err) {
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
