var app = require('koa')(),
    // router = require('koa-router')(app),
    Resource = require('koa-resource-router'),
    error = require('koa-error'),
    static = require('koa-static');

var accounts = new Resource('account', require('./app/controllers/accounts.controller'));
var applications = new Resource('app', require('./app/controllers/applications.controller'));
var metrics = new Resource('metric', require('./app/controllers/metrics.controller'));

accounts.add(applications);
applications.add(metrics);

app.use(static('public'));
app.use(error({
    template: './app/views/error.html'
}));
app.use(accounts.middleware());
app.use(applications.middleware());
app.use(metrics.middleware());

app.listen(3000);