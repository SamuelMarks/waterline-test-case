import * as async from 'async';
import {tearDownConnections} from '../shared_tests';
import {main} from '../../main';
import {destroy, create, retrieve} from './user_api';
import {IUser, User} from '../../user/model';
import {Connection, Collection, WLError} from 'waterline';

const user_mock: IUser = {email: 'foo@bar.com'};

describe('User::model', () => {
    before(done =>
        main([User], (err: WLError, collections?: Collection[], connections?: Connection[]) => {
            if (err) return done(err);
            this.collections = collections;
            this.connections = connections;
            return done();
        })
    );

    after(done => tearDownConnections(this.connections, done));

    beforeEach(done => destroy(this.collections, user_mock, done));
    afterEach(done => destroy(this.collections, user_mock, done));

    describe('create user', () => {
        it('should create user', done => {
            async.series([
                    cb => create(this.collections, user_mock, cb),
                    cb => retrieve(this.collections, user_mock, cb)
                ],
                done
            );
        });
    });
});
