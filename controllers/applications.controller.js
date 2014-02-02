var api = {};


// GET /app
api.index = function *(next) {
    yield next;
    this.body = { route: 'account-index' };
};

// GET /app/new
api.new = function *(next) {
    yield next;
    this.body = { route: 'app-new' };
};

// POST /app
api.create = function *(next) {
    yield next;
    this.body = { route: 'app-create' };
};

// GET /app/:app
api.show = function *(next) {
    this.app = this.params.app;
    this.account = this.params.account;
    yield next;
    this.body = { route: 'app-show', app: this.app, account: this.account };
};

// GET /app/:app/edit
api.edit = function *(next) {
    yield next;
    this.body = { route: 'app-edit', metric: this.params.metric };
};

// PUT /app/:app
api.update = function *(next) {
    yield next;
    this.body = { route: 'app-update', metric: this.params.metric };
};

// DELETE /app/:app
api.destroy = function *(next) {
    yield next;
    this.body = { route: 'app-destroy', metric: this.params.metric };
};

module.exports = api;