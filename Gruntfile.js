// version 0.2

var path = require('path');
var fs = require('fs');

var ROOT = process.cwd();

var BUILD_DIR = path.join(ROOT, '/build/');

module.exports = function(grunt){

    if (grunt.multik){

        require('./lib/multik.js')(grunt, {
            'buildDir': BUILD_DIR
        });

    } else {

        var tplTaskKeys = [], tplTasks = {},
            tpsDir = path.join(ROOT, 'templates');

        if (grunt.file.isDir(tpsDir)){
            var dirs = fs.readdirSync(tpsDir);
            for (var i = 0; i < dirs.length; i++){
                var dir = dirs[i], key = 'build' + i;
                tplTaskKeys[tplTaskKeys.length] = 'abtemplate:' + key
                tplTasks[key] = {
                    options: {
                        directory: path.join('templates', dir),
                        buildDir: path.join(BUILD_DIR, 'tt', dir),
                        cleanBuildDir: false
                    }
                };
            }
        }

        var tasks = {
            copy: {
                src: {
                    files: [
                        {
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
        };

        if (tplTaskKeys.length > 0){
            tasks['abtemplate'] = tplTasks;
        }

        grunt.initConfig(tasks);

        grunt.registerTask('init', []);

        tplTaskKeys[tplTaskKeys.length] = 'copy:src';
        grunt.registerTask('build', tplTaskKeys);
    }

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-abricos');

};
