import {expect} from 'chai';
import {Query, WLError} from 'waterline';
import {c} from '../../main';
import {fmtError} from '../../utils';
import {IVame, IVameResp} from '../../vame/model';

export function create(vame: IVame, cb: (error: Error|WLError, vame?: IVame) => void) {
    const Vame: Query = c.collections['vame_tbl'];

    Vame.create(vame).exec((err, created_vame: IVameResp) => {
        err = fmtError(err);
        let created_vame_json: IVame;
        try {
            expect(err).to.be.null;
            created_vame_json = created_vame.toJSON();
            ['createdAt', 'updatedAt'].map(k => vame[k] = created_vame_json[k]);
            expect(created_vame_json).to.deep.equal(vame);
        } catch (e) {
            err = <Chai.AssertionError>e;
        } finally {
            cb(err, created_vame_json);
        }
    });
}

export function retrieve(vame: IVame, cb: (error: Error|WLError, vame?: IVame) => void) {
    const Vame: Query = c.collections['vame_tbl'];

    Vame.findOne(vame).exec((err, retrieved_vame: IVameResp) => {
        err = fmtError(err);
        let retrieved_vame_json: IVame;
        try {
            expect(err).to.be.null;
            retrieved_vame_json = retrieved_vame.toJSON();
            ['createdAt', 'updatedAt'].map(k => vame[k] = retrieved_vame_json[k]);
            expect(retrieved_vame_json).to.deep.equal(vame);
        } catch (e) {
            err = <Chai.AssertionError>e;
        } finally {
            cb(err, retrieved_vame_json);
        }
    });
}

export function destroy(vame: IVame, cb: (error: Error|WLError) => void) {
    const Vame: Query = c.collections['vame_tbl'];

    Vame.destroy(vame).exec((err) => {
        err = fmtError(err);
        try {
            expect(err).to.be.null;
        } catch (e) {
            err = <Chai.AssertionError>e;
        } finally {
            cb(err);
        }
    })
}