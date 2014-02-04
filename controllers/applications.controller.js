var render = require('../lib/render');
var accounts = require('../lib/db').accounts;
var parse = require('co-body');
var accountModel = require('../models/accounts.model');

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
    var account = this.params.account;
    var application = parsed.application;

    this.account = yield accounts.findAndModify({
        name: account
    }, {
        $push: {
            applications: {
                name: application,
                created: Date.now()
            }
        }
    });

    this.redirect('/account/' + account + '/app/' + application);
};

/**
 * [show description]
 * @type {[type]}
 */
api.show = function * (next) {
    var app = this.params.app;
    var account = this.params.account;

    this.account = yield accounts.find({
        'applications.name': app,
        name: account
    }, ['applications.$', 'name']);

    this.body = {
        route: 'app-show',
        app: app,
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

/**
 * exports applications controller mapping
 *
 * index    GET     /app/:app
 * new      GET     /app/new
 * create   POST    /app
 * show     GET     /app/:app
 * edit     GET     /app/:app/edit
 * update   PUT     /app/:app
 * destroy  DELETE  /app/:app
 *
 * @type {Object}
 */
module.exports = {
    index: api.index,
    new: [accountModel.get, api.new],
    create: api.create,
    show: api.show,
    edit: api.edit,
    update: api.update,
    destroy: api.destroy
};