#!/usr/bin/env node

import * as Waterline from 'waterline';
import {Collection, WLError, waterline, Connection} from 'waterline';
import * as waterline_postgres from 'waterline-postgresql';
import {uri_to_config} from './utils';
import {User} from './user/model';
import {Vame} from './vame/model';

export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

declare var Object: IObjectCtor;

const db_uri = process.env.RDBMS_URI || process.env.DATABASE_URL || process.env.POSTGRES_URL;

export const waterline_config = {
    /* TODO: Put this all in tiered environment-variable powered .json file */
    adapters: {
        url: db_uri,
        postgres: waterline_postgres
    },
    defaults: {
        migrate: 'create',
    },
    connections: {
        postgres: Object.assign({
            adapter: 'postgres'
        }, uri_to_config(db_uri))
    }
};

export function main(models: Array<{}>,
                     callback: (err: WLError, collections?: Collection[], connections?: Connection[]) => void) {
    const waterline: waterline = new Waterline();

    models.map(model => waterline.loadCollection(Collection.extend(model)));
    console.info('ORM initialised:', models.map(model => model['identity']));

    waterline.initialize(waterline_config, (err, ontology) =>
        err !== null ? callback(err) :
            callback(null, <Collection[]>ontology.collections, <Connection[]>ontology.connections)
    );
}

if (require.main === module) {
    main([User, Vame], (err: WLError) => {
        if (err) throw err;
        console.info('Run `npm test` to duplicate the bug');
    })
}
