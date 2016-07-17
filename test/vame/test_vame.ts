import * as async from 'async';
import {tearDownConnections} from '../shared_tests';
import {main} from '../../main';
import {destroy, create, retrieve} from './vame_api';
import {IVame, Vame} from '../../vame/model';
import {WLError, Collection, Connection} from 'waterline';

const vame_mock: IVame = {vame: 'Ola'};

describe('Vame::model', () => {
    let collections, connections;

    before(done =>
        main([Vame], (err: WLError, _collections?: Collection[], _connections?: Connection[]) => {
            if (err) return done(err);
            collections = _collections;
            connections = _connections;
            return done();
        })
    );

    after(done => tearDownConnections(connections, done));

    beforeEach(done => destroy(collections, vame_mock, done));
    afterEach(done => destroy(collections, vame_mock, done));

    describe('create vame', () => {
        it('should create vame', done => {
            async.series([
                    cb => create(collections, vame_mock, cb),
                    cb => retrieve(collections, vame_mock, cb)
                ],
                done
            );
        });
    });
});
