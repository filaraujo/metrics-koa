var render = require('../../lib/render');
var parse = require('co-body');
var accountModel = require('../../app/models/accounts.model');

var api = {};

/**
 * [index description]
 * @type {[type]}
 */
api.index = function * (next) {
    yield next;
    this.body = yield render('accounts/index', {
        accounts: this.accounts
    });
};

/**
 * [new description]
 * @type {[type]}
 */
api.new = function * (next) {
    yield next;
    this.body = yield render('accounts/new', {});
};

/**
 * [create description]
 * @type {[type]}
 */
api.create = function * (next) {
    var parsed = yield parse(this);
    this.account = parsed.account;

    yield next;

    this.redirect('/account/' + this.account);
};

/**
 * [show description]
 * @type {[type]}
 */
api.show = function * (next) {
    yield next;

    if (!this.account) {
        this.redirect('/account');
        return;
    }

    this.account.route = 'account-show';
    this.body = yield render('accounts/show', {
        account: this.account
    });
};

/**
 * [edit description]
 * @type {[type]}
 */
api.edit = function * (next) {
    yield next;

    if (!this.account) { // @TODO if not owner logic
        this.redirect('/account');
        return;
    }

    this.body = yield render('accounts/edit', {
        account: this.account
    });
};

/**
 * [update description]
 * @type {[type]}
 */
api.update = function * (next) {
    this.account = this.params.account;
    yield next;
    this.body = {
        route: 'account-update',
        account: this.account
    };
};

/**
 * [destroy description]
 * @type {[type]}
 */
api.destroy = function * (next) {
    this.account = this.params.account;

    yield next;

    this.body = {
        route: 'account-destroy',
        account: this.account
    };
};


/**
 * exports account controller mapping
 *
 * index    GET     /account
 * new      GET     /account/new
 * create   POST    /account
 * show     GET     /account/:account
 * edit     GET     /account/:account/edit
 * update   PUT     /account/:account
 * destroy  DELETE  /account/:account
 *
 * @type {Object}
 */
module.exports = {
    index: [accountModel.getAll, api.index],
    new: api.new,
    create: [api.create, accountModel.add],
    show: [api.show, accountModel.get],
    edit: [api.edit, accountModel.get],
    update: api.update,
    destroy: [api.destroy, accountModel.remove]
};