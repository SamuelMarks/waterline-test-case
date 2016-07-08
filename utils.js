"use strict";
function uri_to_config(uri) {
    return (function (arr) {
        switch (arr.length) {
            case 3:
                var user = arr[0];
                return (Object.assign({
                    user: user,
                    identity: user
                }, function passwd_host() {
                    var at_at = arr[1].search('@');
                    if (at_at === -1)
                        return {host: arr[1]};
                    return {
                        pass: arr[1].substr(0, at_at),
                        host: arr[1].substr(at_at + 1)
                    };
                }(), function port_db() {
                    var slash_at = arr[2].search('/');
                    if (slash_at === -1)
                        return {database: arr[2]};
                    return {
                        port: arr[2].substr(0, slash_at),
                        database: arr[2].substr(slash_at + 1)
                    };
                }()));
            case 2:
                var u = arr[0].substr(arr[0].search('//') + 2);
                return Object.assign({
                    user: u,
                    identity: u
                }, function passwd_host_db() {
                    function host_db(s) {
                        var slash_at = s.search('/');
                        if (slash_at === -1)
                            return {host: s};
                        return {
                            host: s.substr(0, slash_at),
                            database: s.substr(slash_at + 1)
                        };
                    }
                    var at_at = arr[1].search('@');
                    if (at_at === -1)
                        return host_db(arr[1]);
                    return Object.assign({password: arr[1].substr(0, at_at)}, host_db(arr[1].substr(at_at + 1)));
                }());
            case 1:
                return {
                    user: 'postgres',
                    identity: 'postgres',
                    host: arr[0].substr(arr[0].search('//') + 2)
                };
            default:
                throw TypeError('Unable to acquire config from uri');
        }
    })(uri.slice('postgres'.length + 3).split(':'));
}
exports.uri_to_config = uri_to_config;
function fmtError(error) {
    if (!error)
        return null;
    else if (error.originalError) {
        if (!process.env['NO_DEBUG'])
            console.error(error);
        error = error.originalError;
    }
    else if (error.invalidAttributes || error.hasOwnProperty('internalQuery'))
        return Object.assign({
            error: {
                23505: 'unique_violation'
            }[error.code],
            error_message: error.reason || error.detail
        }, (function (o) {
            return Object.keys(o.error_metadata).length > 0 ? o : {};
        })({
            error_metadata: Object.assign({}, error.invalidAttributes ? {invalidAttributes: error.invalidAttributes} : {}, error.details ? {details: error.details.split('\n')} : {})
        }));
    else {
        Object.keys(error).map(function (k) {
            return console.log(k, '=', error[k]);
        });
        throw TypeError('Unhandled input to fmtError:' + error);
    }
}
exports.fmtError = fmtError;
