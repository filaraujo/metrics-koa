var accounts = require('../../lib/db').accounts;
var api = {};

api.get = function * (next){
    var account = this.params.account;
    this.account = yield accounts.findOne({ name: account });
    yield next;
};

api.getAll = function * (next){
    this.accounts = yield accounts.find({});
    yield next;
};

api.add = function * (next){
    yield accounts.insert({
        name: this.account,
        created: Date.now(),
        applications: []
    });
};

api.remove = function * (next){
    yield accounts.remove({
        name: this.account
    });
};

module.exports = api;