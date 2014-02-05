var co = require('co');
var thunkify = require('thunkify');

var metrics = require('../../lib/db').metrics;
var phantomas = thunkify(require('phantomas'));

var api = {};

api.getAll = function * (next) {
    this.metrics = yield metrics.find({});
    yield next;
};

var doThis = co(function * () {
    var results = yield phantomas('http://example.com', {
        "analyze-css": true
    });
    var db = yield metrics.insert({
        timestamp: Date.now(),
        metrics: results[0].metrics
    });
    console.log(db)
});

api.create = function * (next) {
    yield next;

    doThis();
};

module.exports = api;