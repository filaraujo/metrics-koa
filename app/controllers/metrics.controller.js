var metricsHelper = require('../helpers/metrics.helper');
var api = {};


/**
 * [index description]
 * @type {[type]}
 */
api.index = function *(next) {
    yield next;
    this.body = { route: 'metrics-index' };
};

/**
 * [new description]
 * @type {[type]}
 */
api.new = function *(next) {
    yield next;
    metricsHelper.run();
    this.body = { route: 'metrics-new' };
};

/**
 * [create description]
 * @type {[type]}
 */
api.create = function *(next) {
    yield next;
    this.body = { route: 'metrics-create' };
};

/**
 * [show description]
 * @type {[type]}
 */
api.show = function *(next) {
    this.app = this.params.app;
    this.account = this.params.account;
    this.metric = this.params.metric;
    yield next;
    this.body = { route: 'metrics-show', app: this.app, account: this.account, metric: this.metric };
};

/**
 * [edit description]
 * @type {[type]}
 */
api.edit = function *(next) {
    yield next;
    this.body = { route: 'metrics-edit', metric: this.params.metric };
};

/**
 * [update description]
 * @type {[type]}
 */
api.update = function *(next) {
    yield next;
    this.body = { route: 'metrics-update', metric: this.params.metric };
};

/**
 * [destroy description]
 * @type {[type]}
 */
api.destroy = function *(next) {
    yield next;
    this.body = { route: 'metrics-destroy', metric: this.params.metric };
};

/**
 * exports metrics controller mapping
 *
 * index    GET     /metrics/:metric
 * new      GET     /metrics/new
 * create   POST    /metrics
 * show     GET     /metrics/:metric
 * edit     GET     /metrics/:metric/edit
 * update   PUT     /metrics/:metric
 * destroy  DELETE  /metrics/:metric
 *
 * @type {Object}
 */
module.exports = {
    index: api.index,
    new: api.new,
    create: api.create,
    show: api.show,
    edit: api.edit,
    update: api.update,
    destroy: api.destroy
};