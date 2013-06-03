/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        bower: {
            install: {
            }
        },

    clean: [
      'htdocs/assets/js',
      'tmp'
    ],

    concat: {
      full: {
        src: ['tmp/fastclick.min.js',
              'src/js/external/modernizr.js',
              'tmp/ucsf.partial.min.js'],
        dest: 'htdocs/assets/js/ucsf.js'
      },
      partial: {
        src: ['src/js/ucsf.src.js',
              'src/js/analytics.src.js'],
        dest: 'tmp/ucsf.partial.js'
      }
    },

    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
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
        predef: ['UCSF','FastClick','Modernizr','Hogan','google'],
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
      beforeconcat: ['Gruntfile.js',
              'src/js/modules/research/profile.src.js',
              'src/js/modules/shuttle/shuttle.src.js',
              'src/js/modules/directory/directory.src.js',
              'src/js/modules/news/news.src.js',
              'src/js/modules/maps/maps.src.js',
              'src/js/modules/free_food/free_food.src.js'],
      afterconcat: ['tmp/ucsf.partial.js']
    },

    rsync: {
        "deploy-staging": {
            src: "htdocs/",
            dest: "/var/www/html",
            host: "m-stage",
            recursive: true,
            syncDest: true
        },
        "deploy-live": {
            src: "htdocs/",
            dest: "/var/www/html",
            host: "m",
            recursive: true,
            syncDest: true
        }
    },

    uglify: {
      options: {
        compress: {sequences:false}
      },
      fastclick: {
        files: {
          'tmp/fastclick.min.js': ['components/fastclick/lib/fastclick.js']
        }
      },
      ucsf: {
        files: {
          'tmp/ucsf.partial.min.js': ['tmp/ucsf.partial.js']
        }
      },
      profile: {
        files: {
          'htdocs/research/js/profile.js': ['src/js/modules/research/profile.src.js']
        }
      },
      shuttle: {
        files: {
          'htdocs/assets/js/shuttle.js': ['components/hogan/web/builds/2.0.0/template-2.0.0.js','src/js/modules/shuttle/shuttle.src.js']
        }
      },
      directory: {
        files: {
          'htdocs/assets/js/directory.js': ['components/hogan/web/builds/2.0.0/template-2.0.0.js','src/js/modules/directory/directory.src.js']
        }
      },
      news: {
        files: {
          'htdocs/assets/js/news.js': ['components/hogan/web/builds/2.0.0/template-2.0.0.js','src/js/modules/news/news.src.js']
        }
      },
      maps: {
        files: {
          'htdocs/assets/js/maps.js': ['components/hogan/web/builds/2.0.0/template-2.0.0.js','src/js/modules/maps/maps.src.js']
        }
      },
      free_food: {
        files: {
          'htdocs/assets/js/free_food.js': ['src/js/modules/free_food/free_food.src.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-rsync');

  grunt.registerTask('copy', 'Copy files that do not need any processing', function() {
    grunt.file.copy('components/angular/angular.min.js', 'htdocs/assets/js/angular.js');
  });

  grunt.registerTask('default', ['clean', 'jshint:beforeconcat', 'concat:partial', 'jshint:afterconcat', 'uglify:*', 'compass:dist', 'concat:full', 'copy']);
};
