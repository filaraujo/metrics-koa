var app = require('koa')(),
    // router = require('koa-router')(app),
    Resource = require('koa-resource-router'),
    error = require('koa-error'),
    static = require('koa-static');

// app.use(router);
app.use(static('public'));
app.use(error({
    template: './app/views/error.html'
}));

var account = new Resource('account', require('./app/controllers/accounts.controller'));
var application = new Resource('app', require('./app/controllers/applications.controller'));
// var metrics = app.resource('metric', require('./controllers/metrics.controller'));

account.add(application);
// application.add(metrics);


app.use(account.middleware());
app.use(application.middleware());

app.listen(3000);