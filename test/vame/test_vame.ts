import * as async from 'async';
import {tearDownConnections} from '../shared_tests';
import {main} from '../../main';
import {destroy, create, retrieve} from './vame_api';
import {IVame, Vame} from '../../vame/model';
import {WLError, Collection, Connection} from 'waterline';

const vame_mock: IVame = {vame: 'Ola'};

describe('Vame::model', () => {
    before(done =>
        main([Vame], (err: WLError, collections?: Collection[], connections?: Connection[]) => {
            if (err) return done(err);
            this.collections = collections;
            this.connections = connections;
            return done();
        })
    );

    after(done => tearDownConnections(this.connections, done));

    beforeEach(done => destroy(this.collections, vame_mock, done));
    afterEach(done => destroy(this.collections, vame_mock, done));

    describe('create vame', () => {
        it('should create vame', done => {
            async.series([
                    cb => create(this.collections, vame_mock, cb),
                    cb => retrieve(this.collections, vame_mock, cb)
                ],
                done
            );
        });
    });
});
