var accounts = require('../../lib/db').accounts;
var api = {};

api.get = function * (next){
    var account = this.params.account;
    this.account = yield accounts.findOne({ name: account });
};

api.getAll = function * (next){
    this.accounts = yield accounts.find({});
};

api.create = function * (next){
    this.account = yield accounts.insert({
        name: this.accountName,
        password: this.password,
        created: Date.now(),
        applications: []
    });
};

api.destroy = function * (next){
    yield accounts.remove({
        name: this.accountName
    });
};

module.exports = api;