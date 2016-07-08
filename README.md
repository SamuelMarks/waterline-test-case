waterline-test-case
===================

Test-case for Waterline issue: ["AdapterError: Connection is already registered"](https://github.com/balderdashy/waterline/issues/1376)

## Dependencies

`RDBMS_URI` environment variable pointing to Postgres database with r/w access. 

    npm install -g typings tsc
    typings install
    npm install

## Test

    npm test
