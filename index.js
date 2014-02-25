var app = require('koa')(),
    error = require('koa-error'),
    passport = require('koa-passport'),
    session = require('koa-sess'),
    static = require('koa-static');

var router = require('./lib/router');

app.keys = ['your-session-secret'];

app.use(session())
app.use(passport.initialize());
app.use(passport.session());
app.use(router.middleware());
app.use(static('public'));
app.use(error({
    template: './app/views/error.html'
}));





/**
 * @TODO - google like domain file validating ownership
 * @TODO - live event updates
 *
 * @TODO - metrics db structure idea - nested timestamp/commit id
 * { account: xxxx, metrics: {  timestamp: xxxxx, data: { ... } } }
 *
 */

app.listen(3000);