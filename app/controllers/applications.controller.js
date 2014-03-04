var accountModel = require('../models/accounts.model');
var applicationModel = require('../models/applications.model');
var parse = require('co-body');
var api = {};

/**
 * [index description]
 * @type {[type]}
 */
api.index = function * (next) {
    yield next;
    this.body = {
        route: 'app-index'
    };
};

/**
 * [new description]
 * @type {[type]}
 */
api.new = function * (next) {
    yield accountModel.get;
    yield this.render('applications/new', {
        account: this.account
    });
};

/**
 * [create description]
 * @type {[type]}
 */
api.create = function * (next) {
    var parsed = yield parse(this);
    this.accountName = this.params.account;
    this.applicationName = parsed.application;

    yield accountModel.get;
    yield applicationModel.create;

    this.redirect('/account/' + this.accountName + '/app/' + this.applicationName);
};

/**
 * [show description]
 * @type {[type]}
 */
api.show = function * (next) {
    this.applicationName = this.params.app;
    this.accountName = this.params.account;

    yield applicationModel.get;

    this.body = {
        route: 'app-show',
        app: this.applicationName,
        account: this.account
    };
    // yield this.render('applications/show', { account: this.account });
};

/**
 * [edit description]
 * @type {[type]}
 */
api.edit = function * (next) {
    this.applicationName = this.params.app;
    this.accountName = this.params.account;

    yield applicationModel.get;

    yield this.render('applications/edit', {
        app: this.applicationName,
        account: this.account
    });
};

/**
 * [update description]
 * @type {[type]}
 */
api.update = function * (next) {
    yield next;
    this.body = {
        route: 'app-update',
        metric: this.params.metric
    };
};

/**
 * [destroy description]
 * @type {[type]}
 */
api.destroy = function * (next) {
    this.applicationName = this.params.app;
    this.accountName = this.params.account;

    yield applicationModel.destroy;

    if(this.error){
        this.throw(500);
    }

    this.body = {};
};

// exports api object
module.exports = api;