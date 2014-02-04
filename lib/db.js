var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/metrics-koa');

var account = wrap(db.get('accounts'));
account.index('name', { unique: true });

module.exports = {
    accounts: account
};
