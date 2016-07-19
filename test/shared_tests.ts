import {Connection} from 'waterline';
import * as async from 'async';

export function tearDownConnections(connections: Connection[], cb) {
    return connections ? async.parallel(Object.keys(connections).map(
        connection => connections[connection]._adapter.teardown
    ), () => {
        Object.keys(connections).forEach(connection => {
            connections[connection]._adapter.connections.delete(connection);
        });
        cb();
    }) : cb();
}