import * as async from 'async';
import {tearDownConnections} from '../shared_tests';
import {c, main} from '../../main';
import {destroy, create, retrieve} from './user_api';
import {IUser, User} from '../../user/model';

const user_mock: IUser = {email: 'foo@bar.com'};

describe('User::model', () => {
    before(done =>
        async.series([
            cb => tearDownConnections(c.connections, cb),
            cb => main([User], (err: any) => cb(err))
        ], done)
    );

    after(done => tearDownConnections(c.connections, done));

    beforeEach(done => destroy(user_mock, done));
    afterEach(done => destroy(user_mock, done));

    describe('create user', () => {
        it('should create user', done => {
            async.series([
                    cb => create(user_mock, cb),
                    cb => retrieve(user_mock, cb)
                ],
                done
            );
        });
    });
});
