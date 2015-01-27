/**
 * Configuration for uglify task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('uglify', {
        generated: {
            options: {
                mangle: true,
                preserveComments: 'some',
            }
        }
    });

};

module.exports = taskConfig;
