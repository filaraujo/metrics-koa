var render = require('../lib/render');
var accounts = require('../lib/db').accounts;
var parse = require('co-body');

var api = {};

// GET /account
api.index = function * (next) {
    this.accounts = yield accounts.find({});
    this.body = yield render('accounts/index', { accounts: this.accounts });
};

// GET /account
api.new = function * (next) {
    yield next;
    this.body = yield render('accounts/new', {});
};

// POST /account
api.create = function * (next) {
    var parsed = yield parse(this);
    var account = parsed.account;

    yield accounts.insert({
        name: account,
        created: Date.now(),
        applications: []
    });
    this.redirect('/account/' + account);
};

// GET /account/:account
api.show = function * (next) {
    var account = this.params.account;
    this.account = yield accounts.findOne({ name: account });

    if(!this.account){
        this.redirect('/account');
        return;
    }

    this.account.route = 'account-show';
    this.body = yield render('accounts/show', { account: this.account });
};

// GET /account/:account/edit
api.edit = function * (next) {
    var account = this.params.account;
    this.account = yield accounts.findOne({ name: account });

    if(!this.account){ // @TODO if not owner logic
        this.redirect('/account');
        return;
    }

    this.body = yield render('accounts/edit', { account: this.account });
};

// PUT /account/:account
api.update = function * (next) {
    this.account = this.params.account;
    yield next;
    this.body = {
        route: 'account-update',
        account: this.account
    };
};

// DELETE /account/:account
api.destroy = function * (next) {
    var account = this.params.account;
    var result = yield accounts.remove({ name: account });

    this.body = {
        route: 'account-destroy',
        account: this.account,
        result: result
    };
};

module.exports = api;