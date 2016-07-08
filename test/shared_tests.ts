import * as async from 'async';
import {Connection} from 'waterline';
import {c} from '../main';

export function tearDownConnections(connections: Connection[], cb) {
    return connections ? async.parallel(Object.keys(connections).map(
        connection => connections[connection]._adapter.teardown
    ), cb) : cb()
}

export function clearConnections(cb?: (err?) => void) {
    c.connections = null;
    return cb !== undefined ? cb() : null;
}