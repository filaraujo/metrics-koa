var app = require('koa')(),
    // router = require('koa-router')(app),
    Resource = require('koa-resource-router'),
    error = require('koa-error'),
    static = require('koa-static');

// app.use(router);
app.use(static('public'));
app.use(error({
    template: './views/error.html'
}));

var account = new Resource('account', require('./controllers/accounts.controller'));
var application = new Resource('app', require('./controllers/applications.controller'));
// var metrics = app.resource('metric', require('./controllers/metrics.controller'));

account.add(application);
// application.add(metrics);


app.use(account.middleware());
app.use(application.middleware());

// var accountController = require('./controllers/accounts.controller');
// app.get('/account', accountController.index);
// app.get('/account/new', accountController.new);
// app.post('/account', accountController.create);
// app.get('/account/:account', accountController.show);


app.listen(3000);