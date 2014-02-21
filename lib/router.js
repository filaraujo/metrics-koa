var router = new(require('koa-router'))();

var accountController = require('../app/controllers/accounts.controller');
var accountModel = require('../app/models/accounts.model');
var applicationController = require('../app/controllers/applications.controller');
var applicationModel = require('../app/models/applications.model');
var metricsController = require('../app/controllers/metrics.controller');
var metricsModel = require('../app/models/metrics.model');


/**
 * ACCOUNTS
 * root             /
 *
 * index    GET     /account
 * new      GET     /account/new
 * create   POST    /account
 * show     GET     /account/:account
 * edit     GET     /account/:account/edit
 * update   PUT     /account/:account
 * destroy  DELETE  /account/:account
 */
router.get('/account', accountController.index, accountModel.getAll);
router.get('/account/new', accountController.new);
router.post('/account', accountController.create, accountModel.create);
router.get('/account/:account', accountController.show, accountModel.get);
router.get('/account/:account/edit', accountController.edit, accountModel.get);
router.put('/account/:account', accountController.update);
router.delete('/account/:account', accountController.destroy, accountModel.destroy);


/**
 * APPLICATIONS
 * root             /account/:account
 *
 * index    GET     /app
 * new      GET     /app/new
 * create   POST    /app
 * show     GET     /app/:app
 * edit     GET     /app/:app/edit
 * update   PUT     /app/:app
 * destroy  DELETE  /app/:app
 */
router.get('/account/:account/app', applicationController.index);
router.get('/account/:account/app/new', applicationController.new, accountModel.get);
router.post('/account/:account/app', applicationController.create, accountModel.get, applicationModel.create);
router.get('/account/:account/app/:app', applicationController.show, applicationModel.get);
router.get('/account/:account/app/:app/edit', applicationController.edit);
router.put('/account/:account/app/:app', applicationController.update);
router.delete('/account/:account/app/:app', applicationController.destroy);


/**
 * METRICS
 * root             /
 *
 * index    GET     /metrics/:metric
 * new      GET     /metrics/new
 * create   POST    /metrics
 * show     GET     /metrics/:metric
 * edit     GET     /metrics/:metric/edit
 * update   PUT     /metrics/:metric
 * destroy  DELETE  /metrics/:metric
 */
router.get('/metrics', metricsController.index, metricsModel.getAll, metricsModel.format);
router.get('/metrics/new', metricsController.new, metricsModel.create);
router.post('/metrics', metricsController.create);
router.get('/metrics/:metric', metricsController.show);
router.get('/metrics/:metric/edit', metricsController.edit);
router.put('/metrics/:metric', metricsController.update);
router.delete('/metrics/:metric', metricsController.destroy);


router.get('/metrics.js',function * (next) {
    yield next;
    this.body = this.metrics;
}, metricsModel.getAll, metricsModel.format);

module.exports = router;