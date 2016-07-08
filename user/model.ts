export const User = {
    identity: 'user_tbl',
    connection: 'postgres',
    attributes: {
        email: {
            type: 'string',
            required: true,
            primaryKey: true
        },
        toJSON: function toJSON() {
            let user: IUser = this.toObject();
            for (const key in user)
                if (user.hasOwnProperty(key) && !user[key]) delete user[key];
            return user;
        }
    }
};

export interface IUser {
    email: string;
}

export interface IUserResp extends IUser {
    toJSON: () => IUser;
}