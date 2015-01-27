/**
 * Configuration for HTMLmin task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('htmlmin', {
        dist: {
            options: {
                collapseBooleanAttributes: true,
                conservativeCollapse: true,
                removeCommentsFromCDATA: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true
            },
            files: [{
                expand: true,
                cwd: '<%= yeogurt.dist %>/client',
                src: [
                    '*.html', 'views/**/*.html'
                ],
                dest: '<%= yeogurt.dist %>/client'
            }]
        }
    });

};

module.exports = taskConfig;
