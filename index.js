var app = require('koa')(),
    error = require('koa-error'),
    static = require('koa-static');

var router = require('./lib/router');

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