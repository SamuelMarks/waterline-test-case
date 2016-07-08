"use strict";
exports.User = {
    identity: 'user_tbl',
    connection: 'postgres',
    attributes: {
        email: {
            type: 'string',
            required: true,
            primaryKey: true
        },
        toJSON: function toJSON() {
            var user = this.toObject();
            for (var key in user)
                if (user.hasOwnProperty(key) && !user[key])
                    delete user[key];
            return user;
        }
    }
};
