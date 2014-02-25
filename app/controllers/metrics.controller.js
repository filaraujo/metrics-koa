var render = require('../../lib/render');
var api = {};

/**
 * [index description]
 * @type {[type]}
 */
api.index = function * (next) {
    this.applicationName = this.params.app;
    this.accountName = this.params.account;
    yield next;
    // this.body = this.metrics;
    this.body = yield render('metrics/index', {
        metrics: this.metrics
    });
};

/**
 * [new description]
 * @type {[type]}
 */
api.new = function * (next) {
    yield next;
    this.body = {
        route: 'metrics-new',
        msg: 'metrics scheduled'
    };
};

/**
 * [create description]
 * @type {[type]}
 */
api.create = function * (next) {
    yield next;
    this.body = {
        route: 'metrics-create'
    };
};

/**
 * [show description]
 * @type {[type]}
 */
api.show = function * (next) {
    this.metricName = this.params.metric;

    yield next;
    this.body = {
        route: 'metrics-show',
        metric: this.metric
    };
};

/**
 * [edit description]
 * @type {[type]}
 */
api.edit = function * (next) {
    yield next;
    this.body = {
        route: 'metrics-edit',
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
        route: 'metrics-update',
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
        route: 'metrics-destroy',
        metric: this.params.metric
    };
};

// exports api object
module.exports = api;