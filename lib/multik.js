// Version 0.1.3

var path = require('path');

module.exports = function(grunt, config) {

    var dependency = grunt.multik.currentDependency;
    var dependDir = dependency.directory;
    var buildDir = config.buildDir;
    
    if (dependency.name === 'core') {

        grunt.initConfig({
            abcore: {
                build: {
                    options: {
                        directory: dependDir,
                        buildDir: buildDir
                    }
                }
            },
            abvendor: {
                options: {
                    directory: dependDir,
                    buildDir: path.join(buildDir, 'vendor')
                },
                init: {
                    options: {
                        install: true
                    }
                },
                build: {
                    options: {
                        install: false
                    }
                }
            },
            watch: {
                files: [path.join(dependDir, 'src/**/*')],
                tasks: ['abcore:build']
            }
        });

        grunt.registerTask('init', ['abvendor:init']);
        grunt.registerTask('build', ['abcore:build', 'abvendor:build']);
        grunt.registerTask('buildinst', ['abcore:build', 'abvendor:build']);

    } else if (dependency.group === 'module') {

        grunt.initConfig({
            abmodule: {
                options: {
                    directory: dependDir
                },
                build: {
                    options: {
                        buildDir: path.join(buildDir, 'modules', dependency.name)
                    }
                }
            },
            abvendor: {
                options: {
                    directory: dependDir,
                    buildDir: path.join(buildDir, 'vendor')
                },
                init: {
                    options: {
                        install: true
                    }
                },
                build: {
                    options: {
                        install: false
                    }
                }
            },
            watch: {
                files: [path.join(dependDir, 'src/**/*')],
                tasks: ['abmodule:build']
            }
        });

        grunt.registerTask('init', ['abvendor:init']);
        grunt.registerTask('build', ['abmodule:build', 'abvendor:build']);
        grunt.registerTask('buildinst', ['abmodule:build', 'abvendor:build']);

    } else if (dependency.group === 'template') {

        grunt.initConfig({
            abtemplate: {
                options: {
                    directory: dependDir
                },
                build: {
                    options: {
                        buildDir: path.join(buildDir, 'tt', dependency.name)
                    }
                }
            }
        });

        grunt.registerTask('init', []);
        grunt.registerTask('build', ['abtemplate:build']);
        grunt.registerTask('buildinst', ['abtemplate:build']);

    } else if (dependency.group === 'installer' && dependency.name === 'install') {

        grunt.initConfig({
            copy: {
                main: {
                    cwd: path.join(dependDir),
                    dest: path.join(buildDir, dependency.name),
                    expand: true,
                    flatten: true,
                    src: ['src/**/*']
                }
            }
        });

        grunt.registerTask('init', []);
        grunt.registerTask('build', []);
        grunt.registerTask('buildinst', ['copy']);

    } else if (dependency.group === 'vendor' && dependency.name === 'abricos.js') {

        grunt.initConfig({
            copy: {
                main: {
                    cwd: path.join(dependDir),
                    dest: path.join(buildDir, 'vendor', dependency.name),
                    expand: true,
                    flatten: true,
                    src: ['src/**/*', 'README.md', 'LICENSE']
                }
            }
        });

        grunt.registerTask('init', []);
        grunt.registerTask('build', ['copy']);
        grunt.registerTask('buildinst', ['copy']);

    } else {

        grunt.registerTask('default', []);
        grunt.registerTask('init', []);
        grunt.registerTask('build', []);
        grunt.registerTask('buildinst', []);

    }

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-abricos');

};
