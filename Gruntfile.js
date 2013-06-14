/*global module:false*/
module.exports = function(grunt) {

    var site = 'sites/' + (grunt.option('site') || 'demo');

    // Project configuration.
    grunt.initConfig({
        bower: {
            install: {}
        },

        clean: ['htdocs/*', 'tmp/*', 'components/*', 'lib/*'],

        compass: {
            dist: {
                options: {
                    cssDir: 'htdocs/assets/css',
                    httpStylesheetsPath: '/assets/css',
                    sassDir: site + '/sass',
                    imagesDir: 'htdocs/assets/img',
                    httpImagesPath: '/assets/img',
                    javascriptsDir: 'htdocs/assets/js',
                    httpJavascriptsPath: '/assets/js',
                    outputStyle: 'compressed'
                }
            }
        },

        concat: {
            full: {
                src: ['tmp/fastclick.min.js', 'src/js/external/modernizr.js', 'tmp/campuskit.partial.min.js'],
                dest: 'htdocs/assets/js/campuskit.js'
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
                    {expand: true, dot: true, cwd: site + '/html', src: ['**'], dest: 'htdocs/'},
                    {expand: true, cwd: site, src: ['appcache/**'], dest: 'htdocs/assets/'},
                    {expand: true, cwd: site, src: ['img/**'], dest: 'htdocs/assets/'}
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
            "deploy-staging": {
                src: "htdocs/",
                dest: "/var/www/html",
                host: "m-stage",
                recursive: true,
                syncDest: true,
                args: ["--links"]
            },
            "deploy-live": {
                src: "htdocs/",
                dest: "/var/www/html",
                host: "m",
                recursive: true,
                syncDest: true,
                args: ["--links"]
            }
        },

        uglify: {
            options: {
                compress: {
                    sequences: false
                }
            },
            angular: {
                files: {
                    'htdocs/assets/js/angular.js': ['lib/angular/angular.js']
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
                        dest: 'htdocs/assets/js/modules/',
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
                files: ['src/js/**/*.js'],
                tasks: ['js']
            },
            css: {
                files: ['src/sass/*.scss'],
                tasks: ['compass:dist']
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
};
