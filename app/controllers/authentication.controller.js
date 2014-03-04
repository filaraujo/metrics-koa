var applicationModel = require('../models/authentication.model');
var parse = require('co-body');
var passport = require('koa-passport');
var api = {};

api.authenticate = function * (next) {
    this.req.body = yield parse(this);
    this.req.query = this.query;

    yield passport.authenticate('local', {
        successRedirect: '/account/'+this.req.body.username,
        failureRedirect: '/login'
    });
};

api.login = function * (next) {
    yield this.render('login', {});
};

api.logout = function * (next) {
    this.req.logout();
    this.redirect('/login');
};


api.requireAuth = function * (next) {
    if (this.req.isAuthenticated()) {
        yield next;
    } else {
        this.redirect('/login');
    }
};

module.exports = api;