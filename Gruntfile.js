var path = require('path');

var ROOT = process.cwd();

var SITE_NAME = 'abricos';

// var BUILD_DIR = path.join(ROOT, '/build/', SITE_NAME);
var BUILD_DIR = path.join(ROOT, '/build/');

module.exports = function(grunt) {

    if (grunt.multik) {

        require('./lib/multik.js')(grunt, {
            'buildDir': BUILD_DIR
        });

    } else {

        grunt.initConfig({
            abtemplate: {
                build: {
                    options: {
                        directory: path.join('templates', SITE_NAME),
                        buildDir: path.join(BUILD_DIR, 'tt', SITE_NAME),
                        cleanBuildDir: false
                    }
                }
            },
            copy: {
                src: {
                    files: [{
                            expand: true,
                            cwd: 'src',
                            src: [
                                '**/*',
                                '.htaccess'
                            ],
                            dest: BUILD_DIR
                        }
                    ]
                }
            },
            watch: {
                files: [
                    'src/**/*',
                    'templates/**/*'
                ],
                tasks: ['build']
            }
        });

        grunt.registerTask('init', []);
        grunt.registerTask('build', ['abtemplate:build', 'copy:src']);
    }

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-abricos');

};
