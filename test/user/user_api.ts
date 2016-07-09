import {expect} from 'chai';
import {Query, WLError} from 'waterline';
import {fmtError} from '../../utils';
import {IUser, IUserResp} from '../../user/model';
import {Collection} from 'waterline';

export function create(collections: Collection[], user: IUser, cb: (error: Error|WLError, user?: IUser) => void) {
    const User: Query = collections['user_tbl'];

    User.create(user).exec((err, created_user: IUserResp) => {
        err = fmtError(err);
        let created_user_json: IUser;
        try {
            expect(err).to.be.null;
            created_user_json = created_user.toJSON();
            ['createdAt', 'updatedAt'].map(k => user[k] = created_user_json[k]);
            expect(created_user_json).to.deep.equal(user);
        } catch (e) {
            err = <Chai.AssertionError>e;
        } finally {
            cb(err, created_user_json);
        }
    });
}

export function retrieve(collections: Collection[], user: IUser, cb: (error: Error|WLError, user?: IUser) => void) {
    const User: Query = collections['user_tbl'];

    User.findOne(user).exec((err, retrieved_user: IUserResp) => {
        err = fmtError(err);
        let retrieved_user_json: IUser;
        try {
            expect(err).to.be.null;
            retrieved_user_json = retrieved_user.toJSON();
            ['createdAt', 'updatedAt'].map(k => user[k] = retrieved_user_json[k]);
            expect(retrieved_user_json).to.deep.equal(user);
        } catch (e) {
            err = <Chai.AssertionError>e;
        } finally {
            cb(err, retrieved_user_json);
        }
    });
}

export function destroy(collections: Collection[], user: IUser, cb: (error: Error|WLError) => void) {
    const User: Query = collections['user_tbl'];

    User.destroy(user).exec((err) => {
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