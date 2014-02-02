var views = require('co-views');

console.log('x');

module.exports = views('views', {
    map: {
        html: 'swig'
    }
});