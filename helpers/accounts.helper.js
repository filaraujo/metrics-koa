var api = {};

var accounts = require('../lib/db').accounts;

api.get = function * (next){
    var account = this.params.account;
    this.account = yield accounts.findOne({ name: account });
    yield next;
};

api.getAll = function * (next){
    this.accounts = yield accounts.find({});
    yield next;
};

module.exports = api;