var grunt = require('grunt');
var gruntFile = require('./../../Gruntfile')(grunt);

exports.run = function(metric, cb){
    var task = 'metrics';

    if(metric){
        task += ':'+metric;
    }

    grunt.tasks(task, {});
};