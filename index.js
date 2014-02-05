var app = require('koa')(),
    error = require('koa-error'),
    static = require('koa-static');

var router = require('./lib/router');

app.use(router.middleware());
app.use(static('public'));
app.use(error({
    template: './app/views/error.html'
}));


app.listen(3000);