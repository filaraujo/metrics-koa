var api = {};

// GET /account
api.index = function *(next) {
    yield next;
    this.body = { route: 'account-index' };
};

// POST /account
api.new = function *(next) {
    yield next;
    // metricsHelper.run();
    this.body = { route: 'account-new' };
};

// POST /app
api.create = function *(next) {
    yield next;
    this.body = { route: 'account-create' };
};

// GET /account/:account
api.show = function *(next) {
    this.account = this.params.account;
    yield next;
    this.body = { route: 'account-show', metric: this.account };
};

// GET /account/:account/edit
api.edit = function *(next) {
    this.account = this.params.account;
    yield next;
    this.body = { route: 'account-edit', metric: this.account };
};

// PUT /account/:account
api.update = function *(next) {
    this.account = this.params.account;
    yield next;
    this.body = { route: 'account-update', metric: this.account };
};

// DELETE /account/:account
api.destroy = function *(next) {
    this.account = this.params.account;
    yield next;
    this.body = { route: 'account-destroy', metric: this.account };
};

module.exports = api;