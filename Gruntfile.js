/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    clean: ['dist'],
    concat: {
      full: {
        src: ['root/assets/js/core/modernizr.js',
              'dist/ucsf.partial.min.js'],
        dest: 'root/assets/js/ucsf.js'
      },
      partial: {
        src: ['root/assets/js/ucsf/ucsf.src.js',
              'root/assets/js/utility/analytics.src.js'],
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
        predef: ['UCSF','Modernizr','Hogan','google'],
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
              'root/research/js/profile.src.js',
              'root/assets/js/ucsf/shuttle.src.js'],
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
      profile: {
        files: {
          'root/research/js/profile.js': ['root/research/js/profile.src.js']
        }
      },
      shuttle: {
        files: {
          'root/assets/js/shuttle.js': ['root/assets/js/core/template-2.0.0.js','root/assets/js/ucsf/shuttle.src.js']
        }
      },
      directory: {
        files: {
          'root/assets/js/directory.js': ['root/assets/js/core/template-2.0.0.js','root/assets/js/ucsf/directory.src.js']
        }
      },
      news: {
        files: {
          'root/assets/js/news.js': ['root/assets/js/core/template-2.0.0.js','root/assets/js/ucsf/news.src.js']
        }
      },
      maps: {
        files: {
          'root/assets/js/maps.js': ['root/assets/js/core/template-2.0.0.js','root/assets/js/ucsf/maps.src.js']
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
