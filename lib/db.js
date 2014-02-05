var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/metrics-koa');

var account = wrap(db.get('accounts'));
account.index('name', { unique: true });

var metrics = wrap(db.get('metrics'));

module.exports = {
    accounts: account,
    metrics: metrics
};
