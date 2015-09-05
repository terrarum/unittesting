module.exports = function(grunt) {

    grunt.initConfig({

        requirejs: {
            prod: {
                options: {
                    baseUrl: 'src/',
                    mainConfigFile: 'src/js/config.js',
                    name: 'vendor/almond',
                    out: 'dist/todo.js',
                    include: ['js/config'],
                    insertRequire: ['js/config']
                }
            }
        },

        sass: {
            build: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'dist/todo.css': 'src/styles/main.scss'
                }
            }
        },

        copy: {
            static: {
                src: 'src/index.html',
                dest: 'dist/index.html'
            }
        },

        watch: {
            static: {
                files: 'src/index.html',
                tasks: ['copy:static']
            },
            sass: {
                files: 'src/styles/**/*.scss',
                tasks: ['sass']
            },
            require: {
                files: 'src/js/**/*.js',
                tasks: ['requirejs']
            }
        },

        browserSync: {
            bsFiles: {
                src : 'dist/todo.css'
            },
            options: {
                watchTask: true,
                proxy: 'http://localhost/todo-standards/dist'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('default', ['copy', 'sass', 'requirejs']);
    grunt.registerTask('watchsync', ['browserSync', 'watch']);
};