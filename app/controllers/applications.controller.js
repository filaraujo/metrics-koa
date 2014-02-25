var render = require('../../lib/render');
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
    yield next;
    this.body = yield render('applications/new', {
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

    yield next;

    this.redirect('/account/' + this.accountName + '/app/' + this.applicationName);
};

/**
 * [show description]
 * @type {[type]}
 */
api.show = function * (next) {
    this.applicationName = this.params.app;
    this.accountName = this.params.account;

    yield next;

    this.body = {
        route: 'app-show',
        app: this.applicationName,
        account: this.account
    };
    // this.body = yield render('applications/show', { account: this.account });
};

/**
 * [edit description]
 * @type {[type]}
 */
api.edit = function * (next) {
    yield next;
    this.body = {
        route: 'app-edit',
        metric: this.params.metric
    };
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
    yield next;
    this.body = {
        route: 'app-destroy',
        metric: this.params.metric
    };
};

// exports api object
module.exports = api;