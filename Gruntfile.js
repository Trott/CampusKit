/*global module:false*/
module.exports = function (grunt) {
    'use strict';

    var siteOption = grunt.option('site') || 'demo';
    var platformOption = grunt.option('platform') || 'web';

    if (platformOption in ['web', 'phonegap']) {
        grunt.fail.fatal('Platform must be either "web" or "phonegap"');
    }

    var site = 'sites/' + siteOption;

    var dest;

    if (platformOption === 'phonegap') {
        dest = 'phonegap/www';
    } else {
        dest = 'htdocs';
    }

    var configCopyMainFiles = [
        {expand: true, dot: true, cwd: site + '/html', src: ['**'], dest: dest},
        {expand: true, cwd: site, src: ['appcache/**'], dest: dest},
        {expand: true, cwd: site, src: ['font/**'], dest: dest},
        {expand: true, cwd: site, src: ['img/**'], dest: dest}
    ];

    var configCleanAllSrc = [dest + '/*', 'tmp/*', 'bower_components/*', 'lib/*'];

    if (platformOption === 'phonegap') {
        configCopyMainFiles.unshift(
            {expand: true, cwd: 'phonegap/campuskit_templates/' + siteOption + '/www', src: '**', dest: dest},
            {expand: true, cwd: 'phonegap/campuskit_templates/' + siteOption + '/plugins', src: '**', dest: dest + '/../plugins'}
        );
        configCleanAllSrc.push('phonegap/platforms/*', '!phonegap/platforms/.gitignore');
        configCleanAllSrc.push('phonegap/plugins/*', '!phonegap/plugins/.gitignore');
    }

    var configJshintModules = [site + '/js/modules/*/*.src.js'];
    if (platformOption === 'phonegap') {
        configJshintModules.push(site + '/js/phonegap/modules/*/*.src.js');
    }

    var configUglifyModules = ['**/*.js'];
    if (platformOption === 'phonegap') {
        configUglifyModules.push(['../phonegap/modules/**/*.js']);
    }

    // Project configuration.
    grunt.initConfig({
        bower: {
            install: {}
        },

        clean: {
            all: {
                dot: true,
                src: configCleanAllSrc
            }
        },

        concat: {
            full: {
                src: [
                    'tmp/fastclick.min.js',
                    'src/js/external/modernizr.js',
                    site + '/js/*.min.js',
                    site + '/js/' + platformOption + '/*.min.js',
                    'tmp/campuskit.partial.min.js'
                ],
                dest: dest + '/js/campuskit.js'
            },
            partial: {
                src: ['src/js/campuskit.src.js', site + '/js/*.src.js', site + '/js/' + platformOption + '/*.src.js'],
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
                files: configCopyMainFiles
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: site + '/css',
                src: ['*.css', '!*.min.css'],
                dest: dest + '/css/'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            beforeconcat: configJshintModules,
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
                        src: configUglifyModules,
                        dest: dest + '/js/modules/',
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
                files: [site + '/css/**'],
                tasks: ['cssmin:minify']
            },
            html: {
                files: [ site + '/html/**', site + '/img/**', site + '/font/**', site + '/appcache/**'],
                tasks: ['copy']
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-rsync');

    grunt.registerTask('js', ['jshint:beforeconcat', 'concat:partial', 'jshint:afterconcat', 'uglify:*', 'concat:full']);
    grunt.registerTask('default', ['jshint:gruntfile', 'clean', 'bower:install', 'js', 'cssmin:minify', 'copy']);
    grunt.registerTask('server', ['connect:server']);
    grunt.registerTask('build', ['default']);
};
