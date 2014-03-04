var passport = require('koa-passport');
var LocalStrategy = require('passport-local').Strategy;
var accounts = require('../../lib/db').accounts;

var user = {
    id: 1,
    username: 'test'
};


// should make this a generator
function validate(username, password, done) {

    accounts.findOne({
        name: username,
        password: password
    })(function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    });
}

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    accounts.findOne({
        _id: id
    })(function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(validate));