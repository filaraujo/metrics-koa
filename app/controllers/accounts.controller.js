var accountModel = require('../models/accounts.model');
var parse = require('co-body');
var api = {};

/**
 * [index description]
 * @type {[type]}
 */
api.index = function * (next) {
    yield accountModel.getAll;

    yield this.render('accounts/index', {
        accounts: this.accounts
    });
};

/**
 * [new description]
 * @type {[type]}
 */
api.new = function * (next) {
    // yield next;
    yield this.render('accounts/new', {});
};

/**
 * [create description]
 * @type {[type]}
 */
api.create = function * (next) {
    var parsed = yield parse(this);
    this.accountName = parsed.account;
    this.password = parsed.password;

    yield accountModel.create;
    console.log(this.account);

    this.redirect('/account/' + this.accountName);
};

/**
 * [show description]
 * @type {[type]}
 */
api.show = function * (next) {
    yield accountModel.get;

    if (!this.account) {
        this.redirect('/account');
        return;
    }

    this.account.route = 'account-show';
    yield this.render('accounts/show', {
        account: this.account
    });
};

/**
 * [edit description]
 * @type {[type]}
 */
api.edit = function * (next) {
    yield accountModel.get;

    if (!this.account) { // @TODO if not owner logic
        this.redirect('/account');
        return;
    }

    yield this.render('accounts/edit', {
        account: this.account
    });
};

/**
 * [update description]
 * @type {[type]}
 */
api.update = function * (next) {
    this.accountName = this.params.account;
    yield next;
    this.body = {
        route: 'account-update',
        account: this.accountName
    };
};

/**
 * [destroy description]
 * @type {[type]}
 */
api.destroy = function * (next) {
    this.accountName = this.params.account;

    yield accountModel.destroy;

    this.body = {
        route: 'account-destroy',
        account: this.account
    };
};

// exports api object
module.exports = api;