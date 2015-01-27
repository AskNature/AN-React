/**
 * Configuration for concurrent task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('concurrent', {
        images: [
            'imagemin:dist',
        ],
        compile: [
            'sass:dist',
            'browserify:dist'
        ],
        docs: [
            'jsdoc:dist',
            'styleguide:dist'
        ]
    });

};

module.exports = taskConfig;
