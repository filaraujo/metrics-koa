module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        phantomas: {
            home: {
                options: {
                    indexPath: './metrics/home/',
                    url: 'http://staging.xfinitytv.comcast.net'
                }
            },
            tvlistings: {
                options: {
                    indexPath: './metrics/tvlistings/',
                    url: 'http://staging.xfinitytv.comcast.net/tv-listings'
                }
            },
            browseMovies: {
                options: {
                    indexPath: './metrics/browse/movies/',
                    url: 'http://staging.xfinitytv.comcast.net/movies'
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-phantomas');

    // Default task(s)
    grunt.registerTask('metrics', ['phantomas']);
    grunt.registerTask('metrics:home', ['phantomas:home']);
    grunt.registerTask('metrics:tvlistings', ['phantomas:tvlistings']);
    grunt.registerTask('metrics:browseMovies', ['phantomas:browseMovies']);

};