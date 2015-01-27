/**
 * Configuration for node environment task(s)
 */
'use strict';


var taskConfig = function(grunt) {

    grunt.config.set('env', {
        dev: {
            NODE_ENV: 'development'
        },
        prod: {
            NODE_ENV: 'production'
        },
        all: {
            // Environment variables that are always loaded
        }
    });

};

module.exports = taskConfig;
