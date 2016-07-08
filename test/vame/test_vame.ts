import * as async from 'async';
import {tearDownConnections} from '../shared_tests';
import {c, main} from '../../main';
import {destroy, create, retrieve} from './vame_api';
import {IVame, Vame} from '../../vame/model';

const vame_mock: IVame = {vame: 'Ola'};

describe('Vame::model', () => {
    before(done =>
        async.series([
            cb => tearDownConnections(c.connections, cb),
            cb => main([Vame], (err: any) => cb(err))
        ], done)
    );

    after(done => tearDownConnections(c.connections, done));

    beforeEach(done => destroy(vame_mock, done));
    afterEach(done => destroy(vame_mock, done));

    describe('create vame', () => {
        it('should create vame', done => {
            async.series([
                    cb => create(vame_mock, cb),
                    cb => retrieve(vame_mock, cb)
                ],
                done
            );
        });
    });
});
