'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/js/transition.js',
    'bower_components/bootstrap/js/alert.js',
    'bower_components/bootstrap/js/button.js',
    'bower_components/bootstrap/js/carousel.js',
    'bower_components/bootstrap/js/collapse.js',
    'bower_components/bootstrap/js/dropdown.js',
    'bower_components/bootstrap/js/modal.js',
    'bower_components/bootstrap/js/tooltip.js',
    'bower_components/bootstrap/js/popover.js',
    'bower_components/bootstrap/js/scrollspy.js',
    'bower_components/bootstrap/js/tab.js',
    'bower_components/bootstrap/js/affix.js',
    'js/_*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'js/*.js',
        '!js/scripts.min.js',
        '!js/scripts.js',
        '!**/*.min.*'
      ]
    },
    less: {
      dev: {
        files: {
          'css/main.min.css': [
            'less/main.less'
          ]
        },
        options: {
          compress: true,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: true,
          sourceMapFilename: 'css/main.css.map',
          sourceMapRootpath: '/app/themes/roots/'
        }
      },
      build: {
        files: {
          'css/main.min.css': [
            'less/main.less'
          ]
        },
        options: {
          compress: true
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'js/scripts.min.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'js/scripts.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'css/'
          }
        },
        // src: 'css/main.css'
src: 'css/main.min.css'
      },
      build: {
        src: 'css/main.min.css'
      }
    },
    modernizr: {
dev: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: 'js/modernizr.min.js',
        files: {
          'src': [
            ['js/scripts.min.js'],
            ['css/main.min.css']
          ]
        },
        uglify: true,
        parseFiles: true
      },
      build: {
        devFile: 'bower_components/modernizr/modernizr.js',
        outputFile: 'js/modernizr.min.js',
        files: {
          'src': [
            ['js/scripts.min.js'],
            ['css/main.min.css']
          ]
        },
        uglify: true,
        parseFiles: true
      }
    },
    version: {
      default: {
        options: {
          format: true,
          length: 32,
          manifest: 'manifest.json',
          querystring: {
            style: 'jbg_css',
            script: 'jbg_js'
          }
        },
        files: {
          'lib/scripts.php': '{css,js}/{main,scripts}.min.{css,js}'
        }
      }
    },
    watch: {
      less: {
        files: [
          'less/*.less',
          'less/**/*.less'
        ],
        tasks: ['less:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'css/main.min.css',
          'js/scripts.min.js',
          '*.php'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'jshint',
    'less:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'jshint',
    'less:build',
    'autoprefixer:build',
    'uglify',
    'modernizr'
      ]);
};