'use strict';

let errorFactory = require('error-factory');

let errors = [
    {name: 'BadRequest', statusCode: 400, message: 'Bad Request', status: 'failure'},
    {name: 'NotAuthorized', statusCode: 401, message: 'Not Authorized', status: 'failure'},
    {name: 'NotFound', statusCode: 404, message: 'Not Found', status: 'failure'},
    {name: 'ServerError', statusCode: 500, message: 'Internal Server Error', status: 'failure'}
];

errors.forEach(e => {
    module.exports[e.name] = errorFactory(e.name, {
        message: e.message,
        statusCode: e.statusCode
    });
});