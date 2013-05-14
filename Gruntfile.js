/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: ['dist'],
    concat: {
      full: {
        src: ['htdocs/assets/js/core/fastclick/fastclick.min.js',
              'htdocs/assets/js/core/modernizr.js',
              'dist/ucsf.partial.min.js'],
        dest: 'htdocs/assets/js/ucsf.js'
      },
      partial: {
        src: ['htdocs/assets/js/ucsf/ucsf.src.js',
              'htdocs/assets/js/utility/analytics.src.js'],
        dest: 'dist/ucsf.partial.js'
      }
    },
    qunit: {
      files: []
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
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
              'htdocs/assets/js/ucsf/mainPage.src.js',
              'htdocs/research/js/profile.src.js',
              'htdocs/assets/js/ucsf/shuttle.src.js',
              'htdocs/assets/js/ucsf/directory.src.js',
              'htdocs/assets/js/ucsf/news.src.js',
              'htdocs/assets/js/ucsf/maps.src.js'],
      afterconcat: ['dist/ucsf.partial.js']
    },
    uglify: {
      options: {
        compress: {sequences:false}
      },
      ucsf: {
        files: {
          'dist/ucsf.partial.min.js': ['dist/ucsf.partial.js']
        }
      },
      mainPage: {
        files: {
          'htdocs/assets/js/mainPage.js': ['htdocs/assets/js/ucsf/mainPage.src.js']
        }
      },
      profile: {
        files: {
          'htdocs/research/js/profile.js': ['htdocs/research/js/profile.src.js']
        }
      },
      shuttle: {
        files: {
          'htdocs/assets/js/shuttle.js': ['htdocs/assets/js/core/template-2.0.0.js','htdocs/assets/js/ucsf/shuttle.src.js']
        }
      },
      directory: {
        files: {
          'htdocs/assets/js/directory.js': ['htdocs/assets/js/core/template-2.0.0.js','htdocs/assets/js/ucsf/directory.src.js']
        }
      },
      news: {
        files: {
          'htdocs/assets/js/news.js': ['htdocs/assets/js/core/template-2.0.0.js','htdocs/assets/js/ucsf/news.src.js']
        }
      },
      maps: {
        files: {
          'htdocs/assets/js/maps.js': ['htdocs/assets/js/core/template-2.0.0.js','htdocs/assets/js/ucsf/maps.src.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['clean', 'jshint:beforeconcat', 'concat:partial', 'jshint:afterconcat', 'uglify:*', 'concat:full']);
};
