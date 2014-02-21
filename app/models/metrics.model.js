var co = require('co');
var thunkify = require('thunkify');
var _ = require('lodash');

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

    results[0].metrics.timestamp = Date.now();
    var db = yield metrics.update({
        account: 'test',
        application: 'test'
    }, {
        $push: {
            'metrics': results[0].metrics
        }
    }, {
        upsert: true
    });
});

api.create = function * (next) {
    yield next;

    doThis();
};


api.format = function * (next) {
    if (!this.metrics.length) {
        return;
    }

    var m = this.metrics[0],
        data = m.metrics[0],
        timestamps = _.pluck(m.metrics, 'timestamp').map(function(val) {
            return new Date(val).getTime();
        });

    // console.log(m.metrics)
    var obj = {};

    _.forIn(data, function(value, key) {

        obj[key] = _.pluck(m.metrics, key);

        if (key === "timestamp") {
            return;
        }

        var data = _.pluck(m.metrics, key);
        obj[key] = [data, timestamps];

    });

    this.metrics = obj;

    yield next;
};
module.exports = api;