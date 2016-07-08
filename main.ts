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

export const c: {collections: Collection[], connections: Connection[]} = {
    collections: null, connections: null
};

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

    waterline.initialize(waterline_config, (err, ontology) => {
        if (err !== null) return callback(err);

        c.collections = <Collection[]>ontology.collections;
        c.connections = <Connection[]>ontology.connections;
        return callback(null, c.collections, c.connections);
    });
}

if (require.main === module) {
    main([User, Vame], (err: WLError, collections?: Collection[], connections?: Connection[]) => {
        if (err) throw err;
    })
}
