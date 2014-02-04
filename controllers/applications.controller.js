var render = require('../lib/render');
var accounts = require('../lib/db').accounts;
var parse = require('co-body');

var api = {};


// GET /app
api.index = function * (next) {
    yield next;
    this.body = {
        route: 'app-index'
    };
};

// GET /app/new
api.new = function * (next) {
    var account = this.params.account;
    this.account = yield accounts.findOne({
        name: account
    });
    this.body = yield render('applications/new', {
        account: this.account
    });
};

// POST /app
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

// GET /app/:app
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

// GET /app/:app/edit
api.edit = function * (next) {
    yield next;
    this.body = {
        route: 'app-edit',
        metric: this.params.metric
    };
};

// PUT /app/:app
api.update = function * (next) {
    yield next;
    this.body = {
        route: 'app-update',
        metric: this.params.metric
    };
};

// DELETE /app/:app
api.destroy = function * (next) {
    yield next;
    this.body = {
        route: 'app-destroy',
        metric: this.params.metric
    };
};

module.exports = api;