var views = require('koa-views');

module.exports = views('./app/views', 'html', {
    html: 'swig'
});