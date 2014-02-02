var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/metrics-koa');

module.exports = {
    accounts: wrap(db.get('accounts'))
};