var passport = require('koa-passport');
var LocalStrategy = require('passport-local').Strategy;

var user = {
    id: 1,
    username: 'test'
}

function validate(username, password, done){
    if (username === 'test' && password === 'test') {
        done(null, user);
    } else {
        done(null, false);
    }
}

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, user);
});

passport.use(new LocalStrategy(validate));