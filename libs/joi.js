'use strict';

let joi = require('joi');
let Promise = require('bluebird');

joi.validateSync = joi.validate;
joi.validate = Promise.promisify(joi.validate);

module.exports = joi;