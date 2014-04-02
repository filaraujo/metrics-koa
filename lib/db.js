var monk = require('monk');
var wrap = require('co-monk');
// var db = monk('localhost/metrics-koa');
var db = monk('mongodb://user:pass@oceanic.mongohq.com:10009/metrics-koa');


var accounts = wrap(db.get('accounts'));
accounts.index('name', { unique: true });

module.exports = {
    accounts: accounts
};
