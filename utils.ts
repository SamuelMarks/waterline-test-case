import {WLError} from 'waterline';
export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

declare var Object: IObjectCtor;

interface config {
    user: string;
    password?: string;
    host?: string;
    database?: string;
    identity: string;
}

export function uri_to_config(uri: string) {
    return (function (arr: string[]): config {
        switch (arr.length) {
            case 3: // User, [passwd@]host, [port@db]
                const user = arr[0]; // arr[0].substr(arr[0].search('//')+2);
                return <config>(Object.assign(
                    {
                        user: user,
                        identity: user
                    }, function passwd_host(): { host: string, pass?: string } {
                        const at_at: number = arr[1].search('@');
                        if (at_at === -1) return {host: arr[1]};
                        return {
                            pass: arr[1].substr(0, at_at),
                            host: arr[1].substr(at_at + 1)
                        }
                    }(),
                    function port_db(): { database: string, port?: string } {
                        const slash_at: number = arr[2].search('/');
                        if (slash_at === -1) return {database: arr[2]};
                        return {
                            port: arr[2].substr(0, slash_at),
                            database: arr[2].substr(slash_at + 1)
                        }
                    }()
                ));
            case 2: // User, [password@]host[/database]
                const u = arr[0].substr(arr[0].search('//') + 2);
                return Object.assign(
                    {
                        user: u,
                        identity: u
                    }, function passwd_host_db(): { host: string, password?: string } {
                        function host_db(s: string): { host: string, database?: string } {
                            const slash_at = s.search('/');
                            if (slash_at === -1) return {host: s};
                            return {
                                host: s.substr(0, slash_at),
                                database: s.substr(slash_at + 1)
                            }
                        }

                        const at_at: number = arr[1].search('@');
                        if (at_at === -1) return host_db(arr[1]);
                        return Object.assign(
                            {password: arr[1].substr(0, at_at)},
                            host_db(arr[1].substr(at_at + 1))
                        );
                    }()
                );
            case 1:
                // host
                return {
                    user: 'postgres',
                    identity: 'postgres',
                    host: arr[0].substr(arr[0].search('//') + 2)
                };
            default:
                throw TypeError('Unable to acquire config from uri');
        }
    })(uri.slice('postgres'.length + 3).split(':'))
}

export function fmtError(error: WLError | Error | any) {
    if (!error) return null;
    else if (error.originalError) {
        if (!process.env['NO_DEBUG'])
            console.error(error);
        error = error.originalError;
    }

    else if (error.invalidAttributes || error.hasOwnProperty('internalQuery'))
        return Object.assign({
                error: {
                    /* TODO: populate with http://www.postgresql.org/docs/9.5/static/errcodes-appendix.html
                     *  Or use https://raw.githubusercontent.com/ericmj/postgrex/v0.11.1/lib/postgrex/errcodes.txt
                     * */
                    23505: 'unique_violation'
                }[error.code],
                error_message: error.reason || error.detail
            }, ((o: {error_metadata?: {}}) => Object.keys(o.error_metadata).length > 0 ? o : {})({
                error_metadata: Object.assign({},
                    error.invalidAttributes ? {invalidAttributes: error.invalidAttributes} : {},
                    error.details ? {details: error.details.split('\n')} : {}
                )
            })
        );
    else {
        Object.keys(error).map(k => console.log(k, '=', error[k]));
        throw TypeError('Unhandled input to fmtError:' + error)
    }
}
