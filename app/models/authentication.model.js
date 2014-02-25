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
    })(function(err, results) {
        if (!results.length) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, user);
});

passport.use(new LocalStrategy(validate));