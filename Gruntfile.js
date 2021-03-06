/* global module: false */
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
        dest = 'dist';
    }

    var configCopyMainFiles = [
        {expand: true, dot: true, cwd: site + '/html', src: ['**'], dest: dest},
        {expand: true, cwd: site, src: ['font/**'], dest: dest},
        {expand: true, cwd: site, src: ['img/**'], dest: dest},
        {expand: true, flatten: true, ext: '.js', cwd: site, src: ['js/modules/**/*.min.js'], dest: dest+'/js/modules'}
    ];

    var configCleanAllSrc = [dest + '/*', 'tmp/*'];

    if (platformOption === 'phonegap') {
        configCopyMainFiles.unshift(
            {expand: true, cwd: 'phonegap/campuskit_templates/' + siteOption + '/www', src: '**', dest: dest}
        );
        configCleanAllSrc.push('phonegap/platforms/*', '!phonegap/platforms/.gitignore');
        configCleanAllSrc.push('phonegap/plugins/*', '!phonegap/plugins/.gitignore');
    }

    var configInlineAngularTemplatesDistFiles = platformOption === 'web' ?
        {'dist/index.html': [site + '/angular_templates/*/*.html']} :
        {'phonegap/www/index.html': [site + '/angular_templates/*/*.html']};

    // Project configuration.
    grunt.initConfig({
        clean: {
            all: {
                dot: true,
                src: configCleanAllSrc
            }
        },

        concat: {
            full: {
                src: [
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
                    base: 'dist',
                    hostname: 'localhost',
                    port: 8000,
                    livereload: true
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

        inline_angular_templates: {
            dist: {
                options: {
                    base: site + '/angular_templates',
                    selector: '#ng-app'
                },
                files: configInlineAngularTemplatesDistFiles
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
                boss: true,
                eqnull: true,
                globals: {
                    'angular': true,
                    'google': false,
                    'Hogan': false,
                    'Modernizr': false,
                    'UCSF': false
                }
            },
            beforeconcat: {
                options: {
                    browser: true
                },
                src: [site + '/js/modules/*/*.src.js']
            },
            afterconcat: {
                options: {
                    browser: true
                },
                src: ['tmp/campuskit.partial.js']
            },
            gruntfile: {
                options: {
                    es5: true,
                    globals: {
                        'module': false,
                        'require': false
                    }
                },
                src: ['Gruntfile.js']
            }
        },

        rsync: {
            'deploy-staging': {
                src: 'dist/',
                dest: '/var/www/html',
                host: 'm-stage',
                recursive: true,
                syncDest: true,
                args: ['--links']
            },
            'deploy-live': {
                src: 'dist/',
                dest: '/var/www/html',
                host: 'm',
                recursive: true,
                syncDest: true,
                args: ['--links']
            }
        },

        sass: {
            dist: {
                files: [
                    {
                        cwd: site + '/scss',
                        dest: site + '/css',
                        expand: true,
                        ext: '.css',
                        src: ['[a-zA-Z]**.scss']
                    }
                ],
                options: {
                    includePaths: [
                        site + '/scss'
                    ]
                },
            }
        },

        smoosher: {
            default_options: {
                files: {
                    'dist/index.html': 'dist/index.html',
                },
            },
        },

        uglify: {
            options: {
                compress: {
                    sequences: false
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
                        src: ['**/*.js', '!**/*.min.js'],
                        dest: dest + '/js/modules/',
                        ext: '.js',
                        flatten: true
                    }
                ]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-html-smoosher-install-fix');
    grunt.loadNpmTasks('grunt-inline-angular-templates');
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('js', ['jshint:beforeconcat', 'concat:partial', 'jshint:afterconcat', 'uglify:*', 'concat:full']);
    grunt.registerTask('default', ['jshint:gruntfile', 'clean', 'js', 'sass:dist', 'cssmin:minify', 'copy', 'inline_angular_templates', 'smoosher']);
    grunt.registerTask('server', ['connect:server:keepalive']);
    grunt.registerTask('build', ['default']);
};
