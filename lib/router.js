var Router = require('koa-router');
var public = new Router();
var secure = new Router();

var accountController = require('../app/controllers/accounts.controller');
var authController = require('../app/controllers/authentication.controller');
var applicationController = require('../app/controllers/applications.controller');
var metricsController = require('../app/controllers/metrics.controller');


/**
 * AUTHENTICATION
 * root                         /
 *
 * login            GET         /login
 * authenticate     POST        /login
 * logout           GET         /logout
 * requireAuth      ALL         /account/*      !/account/new       !/account/
 */
public.get('/login', authController.login);
public.post('/login', authController.authenticate);
public.get('/logout', authController.logout);

/**
 * ACCOUNTS
 * root                         /
 *
 * index            GET         /account
 * new              GET         /account/new
 * create           POST        /account
 * show             GET         /account/:account
 * edit             GET         /account/:account/edit
 * update           PUT         /account/:account
 * destroy          DELETE      /account/:account
 */
public.get('/account', accountController.index);
public.get('/account/new', accountController.new);
public.post('/account', accountController.create);
secure.get('/account/:account', accountController.show);
secure.get('/account/:account/edit', accountController.edit);
secure.put('/account/:account', accountController.update);
secure.delete('/account/:account', accountController.destroy);


/**
 * APPLICATIONS
 * root                         /account/:account
 *
 * index            GET         /app
 * new              GET         /app/new
 * create           POST        /app
 * show             GET         /app/:app
 * edit             GET         /app/:app/edit
 * update           PUT         /app/:app
 * destroy          DELETE      /app/:app
 */
secure.get('/account/:account/app', applicationController.index);
secure.get('/account/:account/app/new', applicationController.new);
secure.post('/account/:account/app', applicationController.create);
secure.get('/account/:account/app/:app', applicationController.show);
secure.get('/account/:account/app/:app/edit', applicationController.edit);
secure.put('/account/:account/app/:app', applicationController.update);
secure.delete('/account/:account/app/:app', applicationController.destroy);


/**
 * METRICS
 * root                         /account/:account/app/:app
 *
 * index            GET         /metrics/:metric
 * new              GET         /metrics/new
 * create           POST        /metrics
 * show             GET         /metrics/:metric
 * edit             GET         /metrics/:metric/edit
 * update           PUT         /metrics/:metric
 * destroy          DELETE      /metrics/:metric
 */
secure.get('/account/:account/app/:app/metrics', metricsController.index);
secure.get('/account/:account/app/:app/metrics/new', metricsController.new);
secure.post('/account/:account/app/:app/metrics', metricsController.create);
secure.get('/account/:account/app/:app/metrics/:metric', metricsController.show);
secure.get('/account/:account/app/:app/metrics/:metric/edit', metricsController.edit);
secure.put('/account/:account/app/:app/metrics/:metric', metricsController.update);
secure.delete('/account/:account/app/:app/metrics/:metric', metricsController.destroy);

module.exports = {
    public: public,
    authenticate: authController.requireAuth,
    secure: secure
};