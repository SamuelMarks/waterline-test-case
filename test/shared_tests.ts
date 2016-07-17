import * as async from 'async';
import {Connection} from 'waterline';

export function tearDownConnections(connections: Connection[], cb) {
    return connections ? async.parallel(Object.keys(connections).map(
        connection => connections[connection]._adapter.teardown
    ), cb) : cb()
}
