/**
 * Configuration for injector task(s)
 */
'use strict';

var _str = require('underscore.string');

var taskConfig = function(grunt) {

    grunt.config.set('injector', {
        options: {

        },
        // Inject component scss into main.scss
        sass: {
            options: {
                transform: function(filePath) {
                    filePath = filePath.replace('/client/styles/', '');

                    return '@import \'' + filePath.slice(0, -5) + '\';';
                },
                starttag: '// [pre_injector]',
                endtag: '// [endpre_injector]'
            },
            files: {
                '<%= yeogurt.client %>/styles/main.scss': [
                    '<%= yeogurt.client %>/styles/pre/**/*.scss',
                    '!<%= yeogurt.client %>/styles/main.scss'
                ]
            }
        },
        post_sass: {
            options: {
                transform: function(filePath) {
                    filePath = filePath.replace('/client/styles/', '');

                    return '@import \'' + filePath.slice(0, -5) + '\';';
                },
                starttag: '// [post_injector]',
                endtag: '// [endpost_injector]'
            },
            files: {
                '<%= yeogurt.client %>/styles/main.scss': [
                    '<%= yeogurt.client %>/styles/post/**/*.scss',
                    '!<%= yeogurt.client %>/styles/main.scss'
                ]
            }
        },
        post_css: {
            options: {
                transform: function(filePath) {
                    filePath = filePath.replace('/client/styles/', '');

                    return '@import \'' + filePath + '\';';
                },
                starttag: '// [css_injector]',
                endtag: '// [endcss_injector]'
            },
            files: {
                '<%= yeogurt.client %>/styles/main.scss': [
                    '<%= yeogurt.client %>/styles/**/*.css',
                    '!<%= yeogurt.client %>/styles/main.scss'
                ]
            }
        },
    });

};

module.exports = taskConfig;
