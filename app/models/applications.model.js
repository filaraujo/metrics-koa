var accounts = require('../../lib/db').accounts;
var api = {};

api.create = function * (next) {
    this.account = yield accounts.findAndModify({
        name: this.accountName
    }, {
        $push: {
            applications: {
                name: this.applicationName,
                created: Date.now(),
                metrics: []
            }
        }
    });
    yield next;
};

api.get = function * (next) {
    this.account = yield accounts.find({
        'applications.name': this.applicationName,
        name: this.accountName
    }, ['applications.$', 'name']);
    yield next;
};

api.destroy = function * (next) {
    var destroyed = yield accounts.update({
        name: this.accountName
    }, {
        "$pull": {
            "applications": {
                "name": this.applicationName
            }
        }
    });

    this.error = !destroyed;
    yield next;
};

module.exports = api;