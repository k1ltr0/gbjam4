/* global module */
/* global require */
'use strict';

module.exports = function(grunt)
{
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        watch: {
            options : { livereload : true },
            monkey: {
                files: ['**/*.monkey'],
                tasks: ['shell']
            }
        },

        shell: {
            options: {
                stderr: true
            },
            target: {
                command: 'transcc_macos -target=Html5_Game main.monkey'
            }
        },

        express : {
            all : {
                options: {
                    port : 8888,
                    hostname : 'localhost',
                    bases : ['main.buildv82a/html5/'],
                    livereload : true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('default', ['shell', 'express', 'watch']);
};