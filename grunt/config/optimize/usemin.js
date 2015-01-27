/**
 * Configuration for usemin task(s)
 */
'use strict';

var taskConfig = function(grunt) {

    grunt.config.set('useminPrepare', {
        html: '<%= yeogurt.client %>/index.html',
        options: {
            root: '<%= yeogurt.client %>',
            dest: '<%= yeogurt.dist %>/client'
        }
    });

    grunt.config.set('usemin', {
        html: '<%= yeogurt.dist %>/client/*.html',
        options: {
            assetsDirs: ['<%= yeogurt.client %>', '<%= yeogurt.client %>/images']
        }
    });

};

module.exports = taskConfig;
