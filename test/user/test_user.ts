import * as async from 'async';
import {tearDownConnections} from '../shared_tests';
import {main} from '../../main';
import {destroy, create, retrieve} from './user_api';
import {IUser, User} from '../../user/model';
import {Connection, Collection, WLError} from 'waterline';

const user_mock: IUser = {email: 'foo@bar.com'};

describe('User::model', () => {
    let collections, connections;

    before(done =>
        main([User], (err: WLError, _collections?: Collection[], _connections?: Connection[]) => {
            if (err) return done(err);
            collections = _collections;
            connections = _connections;
            return done();
        })
    );

    after(done => tearDownConnections(connections, done));

    beforeEach(done => destroy(collections, user_mock, done));
    afterEach(done => destroy(collections, user_mock, done));

    describe('create user', () => {
        it('should create user', done => {
            async.series([
                    cb => create(collections, user_mock, cb),
                    cb => retrieve(collections, user_mock, cb)
                ],
                done
            );
        });
    });
});
