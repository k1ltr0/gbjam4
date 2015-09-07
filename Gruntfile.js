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
                files: ['**/*.monkey', 'main.data/*.*'],
                tasks: ['shell:target']
            }
        },

        shell: {
            options: {
                stderr: true
            },
            target: {
                command: 'transcc_macos -target=Html5_Game main.monkey'
            },
            build: {
                command: [
                    'transcc_macos -target=Html5_Game -config=Release main.monkey ',
                    'python -m palette'].join('&&')
            },
            clear: {
                command: 'rm -rf main.buildv82a/html5b'
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
        },


        compress: {
            main: 
            {
                options: { 
                    archive: 'builds/' + grunt.template.today('yyyy-mm-dd') + '.zip' 
                },
                files: [{
                    expand: true, 
                    cwd: 'main.buildv82a/html5', 
                    src: ['**'], 
                    dest: ''
                }]
            },
            secondary : 
            {
                options: {
                    archive: 'builds/' + grunt.template.today('yyyy-mm-dd') + '_b.zip'
                },
                files: [{
                    expand: true,
                    cwd: 'main.buildv82a/html5b',
                    src: ['**'],
                    dest: ''
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('build', ['shell:build', 'compress', 'shell:clear']);
    grunt.registerTask('default', ['shell:target', 'express', 'watch']);
};