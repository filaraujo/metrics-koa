var metricsHelper = require('../helpers/metrics.helper');
var api = {};


// GET /metric
api.index = function *(next) {
    yield next;
    this.body = { route: 'metrics-index' };
};

// GET /metric
api.new = function *(next) {
    yield next;
    metricsHelper.run();
    this.body = { route: 'metrics-new' };
};

// POST /metric
api.create = function *(next) {
    yield next;
    this.body = { route: 'metrics-create' };
};

// GET /metric/:metric
api.show = function *(next) {
    this.app = this.params.app;
    this.account = this.params.account;
    this.metric = this.params.metric;
    yield next;
    this.body = { route: 'metrics-show', app: this.app, account: this.account, metric: this.metric };
};

// GET /metric/:metric/edit
api.edit = function *(next) {
    yield next;
    this.body = { route: 'metrics-edit', metric: this.params.metric };
};

// PUT /metric/:metric
api.update = function *(next) {
    yield next;
    this.body = { route: 'metrics-update', metric: this.params.metric };
};

// DELETE /metric/:metric
api.destroy = function *(next) {
    yield next;
    this.body = { route: 'metrics-destroy', metric: this.params.metric };
};

module.exports = api;