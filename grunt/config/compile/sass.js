/**
 * Configuration for Sass task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('sass', {
        server: {
            options: {
                precision: 10,
                outputStyle: 'nested',
                sourceMap: true,
                includePaths: [
                    '<%= yeogurt.client %>/styles/'
                ]
            },
            files: {
                '<%= yeogurt.tmp %>/styles/main.css': '<%= yeogurt.client %>/styles/main.{scss,sass}'
            }
        },

        /**
         * outputStyle was originally set to 'compressed', but that setting prevented grunt-autoprefixer from working later in the build. The change to 'nested' lets grunt-autoprefixer do its magic, but a cleaner and more performant solution should be identified.
         */

        dist: {
            options: {
                precision: 10,
                outputStyle: 'nested',
                sourceMap: true,
                includePaths: [
                    '<%= yeogurt.client %>/styles/'
                ]
            },
            files: {
                '<%= yeogurt.dist %>/client/styles/main.css': '<%= yeogurt.client %>/styles/main.{scss,sass}'
            }
        }
    });

};

module.exports = taskConfig;
