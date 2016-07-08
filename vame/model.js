"use strict";
exports.Vame = {
    identity: 'vame_tbl',
    connection: 'postgres',
    attributes: {
        vame: {
            type: 'string',
            required: true,
            primaryKey: true
        },
        toJSON: function toJSON() {
            var vame = this.toObject();
            for (var key in vame)
                if (vame.hasOwnProperty(key) && !vame[key])
                    delete vame[key];
            return vame;
        }
    }
};
