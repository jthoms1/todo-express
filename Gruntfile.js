/*global module:false*/

module.exports = function (grunt) {
  var init = {
    dir: {
      bower_components:  grunt.file.readJSON('.bowerrc').directory + "/",
      dev:               'public/',
      prod:              'public/',
      source:            'public_src/',
      js_code:           'public_src/js/',
      css_code:          'public_src/css/'
    },
    pkg: grunt.file.readJSON('package.json'),
    /**
     * Lints javascript files using jshint
     * - excluding templates from list because it is compiled src
     * - excluding global from list because it is output from concat
     * - excluding lib from list because I am only linting my own code.
     */
    jshint: {
      files: [
        '<%= dir.js_code %>!(templates).js'
      ],
      jshintrc: ".jshintrc"
    },

    /*
     * LESS
     * (grunt-less)
     */
    less: {
      // Only need to compile files when working in development environment
      dev: {
        files: {
          '<%= dir.dev %>css/base.css': '<%= dir.css_code %>base.less'
        }
      },

      // When compiling less files for production also minify them(compress)
      prod: {
        files: {
          '<%= dir.prod %>css/base.css': '<%= dir.css_code %>base.less'
        },
        options: {
          compress: true
        }
      }
    },

    jade: {
      compile: {
        options: {
          client: true,
          amd: true
        },
        files: {
          "stuff.js": ["lib/todos/views/*.jade"]
        }
      }
    },

    /**
     * Copy files into the production directory for use when published
     * - Will not copy css, js, templates because they are handled in other tasks
     */
    copy: {
      dev: {
        options: {
          basePath: "."
        },
        files: [
          {expand: true, cwd: '<%= dir.source %>', src: 'img/*', dest: '<%= dir.dev %>'},
          {expand: true, cwd: '<%= dir.bower_components %>html5shiv/src/', src: 'html5shiv.js', dest: '<%= dir.dev %>assets/'},
        ]
      },
      prod: {
        options: {
          basePath: "."
        },
        files: [
          {expand: true, cwd: '<%= dir.source %>', src: 'img/*', dest: '<%= dir.prod %>'},
          {expand: true, cwd: '<%= dir.bower_components %>html5shiv/src/', src: 'html5shiv.js', dest: '<%= dir.prod %>assets/'},
        ]
      }
    },

    clean: {
      prod: {
        src: ['<%= dir.prod %>']
      }
    },

    // Watch to concat js files and concat/compile less(css) files
    watch: {
      less : {
        files: '<%= dir.css_code %>**/*.less',
        tasks: ['less:dev']
      }
    }
  };

  // Project configuration.
  grunt.initConfig(init);

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');

  /** default includes: compiling js templates, 
   *                    compiling/concating js files with requirejs
   *                    compiling less files
   *
   * default task is ran like this: $ grunt
   */
  grunt.registerTask('default', ['less:dev', "copy:dev"]);

  /**
   * task includes: using jshint to lint js files
   *                using less to lint less files
   *
   * default task is ran like this: $ grunt lint-project
   */
  grunt.registerTask('lint-project', ['jshint']);

  /**
   * task includes: clean publish directory,
   *                compile and minify less files - place in publish directory
   *                compiling/concating/minify js files with requirejs - place in publish directory
   *                copy assets and html to publish directory
   *
   * default task is ran like this: $ grunt prod-ready
   */
  grunt.registerTask('prod-ready', ['clean:prod', 'less:prod', 'copy:prod']);
};
