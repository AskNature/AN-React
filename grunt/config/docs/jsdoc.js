/**
 * Configuration for jsdoc task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('jsdoc', {
        server : {
            src: ['<%= yeogurt.client %>/scripts/**/*','<%= yeogurt.server %>/**/*', '*.md'],
            dest: '<%= yeogurt.tmp %>/docs/api',
            options: {
                template : '<%= yeogurt.client %>/docs/api/theme'
            }
        },
        dist : {
            src: ['<%= yeogurt.client %>/scripts/**/*', '<%= yeogurt.server %>/**/*', '*.md'],
            dest: '<%= yeogurt.dist %>/client/docs/api',
            options: {
                template : 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
                configure: 'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json'
            }
        }
    });

};

module.exports = taskConfig;
