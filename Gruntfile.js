/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var site = 'sites/' + (grunt.option('site') || 'demo');
    var dest = 'htdocs/';

    // Project configuration.
    grunt.initConfig({
        bower: {
            install: {}
        },

        clean: {
            all: {
                dot: true,
                src: [dest + '*', 'tmp/*', 'components/*', 'lib/*']
            }
        },

        compass: {
            dist: {
                options: {
                    cssDir: dest + 'assets/css',
                    httpStylesheetsPath: '/assets/css',
                    sassDir: site + '/sass',
                    imagesDir: dest + 'assets/img',
                    httpImagesPath: '/assets/img',
                    javascriptsDir: dest + 'assets/js',
                    httpJavascriptsPath: '/assets/js',
                    outputStyle: 'compressed'
                }
            }
        },

        concat: {
            full: {
                src: ['tmp/fastclick.min.js', 'src/js/external/modernizr.js', 'tmp/campuskit.partial.min.js'],
                dest: dest + 'assets/js/campuskit.js'
            },
            partial: {
                src: ['src/js/campuskit.src.js', site + '/js/*.src.js'],
                dest: 'tmp/campuskit.partial.js'
            }
        },

        connect: {
            server: {
                options: {
                    base: 'htdocs',
                    keepalive: true
                }
            }
        },

        copy : {
            main: {
                files: [
                    {expand: true, dot: true, cwd: site + '/html', src: ['**'], dest: dest},
                    {expand: true, cwd: site, src: ['appcache/**'], dest: dest + 'assets/'},
                    {expand: true, cwd: site, src: ['font/**'], dest: dest + 'assets/'},
                    {expand: true, cwd: site, src: ['img/**'], dest: dest + 'assets/'}
                ]
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                predef: ['UCSF', 'FastClick', 'Modernizr', 'Hogan', 'google', 'angular'],
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                Modernizr: true,
                google: true,
                Hogan: true,
                ucsf: true
            },
            beforeconcat: [site + '/js/modules/*/*.src.js'],
            afterconcat: ['tmp/campuskit.partial.js'],
            gruntfile: ['Gruntfile.js']
        },

        rsync: {
            'deploy-staging': {
                src: 'htdocs/',
                dest: '/var/www/html',
                host: 'm-stage',
                recursive: true,
                syncDest: true,
                args: ['--links']
            },
            'deploy-live': {
                src: 'htdocs/',
                dest: '/var/www/html',
                host: 'm',
                recursive: true,
                syncDest: true,
                args: ['--links']
            }
        },

        uglify: {
            options: {
                compress: {
                    sequences: false
                }
            },
            fastclick: {
                files: {
                    'tmp/fastclick.min.js': ['lib/fastclick/fastclick.js']
                }
            },
            campuskit: {
                files: {
                    'tmp/campuskit.partial.min.js': ['tmp/campuskit.partial.js']
                }
            },
            modules: {
                files: [
                    {
                        expand: true,
                        cwd: site + '/js/modules/',
                        src: ['**/*.js'],
                        dest: dest + 'assets/js/modules/',
                        ext: '.js',
                        flatten: true
                    }
                ]
            }
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            js: {
                files: [site + '/js/**/*.js'],
                tasks: ['js']
            },
            css: {
                files: [site + '/sass/*.scss'],
                tasks: ['compass:dist']
            },
            html: {
                files: [ site + '/html/**', site + '/img/**', site + '/font/**', site + '/appcache/**'],
                tasks: ['copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-rsync');

    grunt.registerTask('js', ['jshint:beforeconcat', 'concat:partial', 'jshint:afterconcat', 'uglify:*', 'concat:full']);
    grunt.registerTask('default', ['jshint:gruntfile', 'clean', 'bower:install', 'js', 'compass:dist', 'copy']);
    grunt.registerTask('server', ['connect:server']);
};
