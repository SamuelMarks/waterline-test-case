export const Vame = {
    identity: 'vame_tbl',
    connection: 'postgres',
    attributes: {
        vame: {
            type: 'string',
            required: true,
            primaryKey: true
        },
        toJSON: function toJSON() {
            let vame: IVame = this.toObject();
            for (const key in vame)
                if (vame.hasOwnProperty(key) && !vame[key]) delete vame[key];
            return vame;
        }
    }
};

export interface IVame {
    vame: string;
}

export interface IVameResp extends IVame {
    toJSON: () => IVame;
}