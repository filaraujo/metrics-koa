var co = require('co');
var thunkify = require('thunkify');
var _ = require('lodash');

var metrics = require('../../lib/db').metrics;
var accounts = require('../../lib/db').accounts;
var phantomas = thunkify(require('phantomas'));

var api = {};

api.getAll = function * (next) {
    var metrics = yield accounts.find({
        'applications.name': this.applicationName,
        name: this.accountName
    }, ['applications.$.metrics']);
    this.metrics = format(metrics[0].applications[0].metrics);
};

// var doThis = co(function * () {
//     var results = yield phantomas('http://wikipedia.com', {
//         "analyze-css": true
//     });

//     console.log('metrics fetched');

//     results[0].metrics.timestamp = Date.now();
//     var db = yield accounts.update({
//         "name": this.applicationName,
//         "applications.name": this.accountName
//     }, {
//         $push: {
//             'applications.$.metrics': results[0].metrics
//         }
//     }, {
//         upsert: true
//     });
// });

api.create = function * (next) {
    var results = yield phantomas('http://wikipedia.com', {
        "analyze-css": true
    });

    console.log('metrics fetched');

    console.log(results[0].metrics);
    console.log(this.applicationName);
    console.log(this.accountName);

    results[0].metrics.timestamp = Date.now();
    var db = yield accounts.update({
        "name": this.accountName,
        "applications.name": this.applicationName
    }, {
        $push: {
            'applications.$.metrics': results[0].metrics
        }
    }, {
        upsert: true
    });
};


function format(metrics) {
    if (!metrics.length) {
        return;
    }

    console.log(metrics)

    var data = metrics[0],
        timestamps = _.pluck(metrics, 'timestamp').map(function(val) {
            return new Date(val).getTime();
        });

    // console.log(m.metrics)
    var obj = {};

    _.forIn(data, function(value, key) {

        obj[key] = _.pluck(metrics, key);

        if (key === "timestamp") {
            return;
        }

        var data = _.pluck(metrics, key);
        obj[key] = [data, timestamps];

    });

    return obj;
}
module.exports = api;