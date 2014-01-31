var app = require('koa')(),
    router = require('koa-router')(app),
    error = require('koa-error'),
    render = require('./lib/render');

app.use(router);
app.use(error({ template: './views/error.html' }));

var account = app.resource('account',require('./controllers/accounts.controller'));
var application = app.resource('app', require('./controllers/applications.controller'));
var metrics = app.resource('metric', require('./controllers/metrics.controller'));
account.add(application);
application.add(metrics);


app.listen(3000);